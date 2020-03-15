import express from 'express'
import bodyParser from 'body-parser'
import query from '@/models/query'
import excelExport from 'excel-export'

const router = express.Router();
const urlencodeParser = bodyParser.urlencoded({ extended: false })

const queryAllSQL = `SELECT employee.*, level.level, department.department
  FROM employee, level, deparment
  WHERE
    employee.levelId = level.id AND
    employee.departmentId = department.id`

router.get('./getEmployee', async (req, res) => {
  const { name = '', departmentId } = req.query
  let conditions = `AND empoyee.name LIKE '%${name}%'`
  if (departmentId) {
    conditions += `AND employee.departmentId=${departmentId}` 
  }
  const sql = `${queryAllSQL} ${conditions} ORDER BY employee.id DESC`
  try {
    let result = await query(sql) as [any]
    result.forEach(i => {
      i.key = i.id
    });
    res.json({
      flag: 0,
      data: result
    })
  } catch(e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
})

router.post('/createEmployee', urlencodeParser, async (req, res) => {
  const { name, departmentId, hiredate, levelId } = req.body
  const sql = `INSERT INTO employee (name, departmentId, hiredate, levelId)
    VALUES ('${name}', '${departmentId}', '${hiredate}', '${levelId}')`
  
  try {
    const result = await query(sql) as { insertId: any }
    res.json({
      flag: 0,
      data: {
        key: result.insertId,
        id: result.insertId,
      }
    })
  } catch(e) {
    res.json({
      flag: 1,
      msg: e.toString(),
    })
  }
})

router.post('/deleteEmployee', async (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM employee WHERE id=${id}`
  try {
    const result = await query(sql)
    res.json({
      flag: 0
    })
  } catch(e) {
    res.json({
      flag: 1,
      msg: e.toString(),
    })
  }
})

router.post('updateEmployee', async (req, res) => {
  const { id, name, departmentId, hiredate, levelId } = req.body // TODO: need urlencodeParser?
  const sql = `UPDATE employee
    SET 
      name='${name}',
      departmentId='${departmentId}',
      hiredate='${hiredate}',
      levelId='${levelId}'
    WHERE
      id='${id}'`
    try {
      const result = await query(sql)
      res.json({
        flag: 0,
      })
    } catch(e) {
      res.json({
        flag: 1,
        msg: e.toString(),
      })
    }
})

let conf: excelExport.Config = {
  cols: [
    { caption: '员工ID', type: 'number' },
    { caption: '姓名', type: 'string' },
    { caption: '部门', type: 'string' },
    { caption: '入职时间', type: 'string' },
    { caption: '职级', type: 'string' },
  ],
  rows: []
}

router.get('/downloadEmployee', async (req, res) => {
  try {
    const result = await query(queryAllSQL) as [any]
    conf.rows = result.map(i => [i.id, i.name, i.deparment, i.hiredate, i.level])
    const excel = excelExport.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    res.setHeader('Content-Disposition', 'attachment; filename=Emploeyee.xlsx')
    res.end(excel, 'binary')
  } catch(e) { 
    e.send(e.toString())
  }
})

export default router