import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd'

import { departmentOptions } from './departmentOptions'
import * as $api from '@/utils/request'
import { GET_EMPLOYEE_URL } from '@/constants/urls'
import { EmployeeResponse } from '@/interface/employee'

interface Props {
  onDataChange: (data: EmployeeResponse) => void
}

const QueryForm = ({ onDataChange, ...props }: Props) => {
  const [name, setName] = useState('')
  const [departmentId, setDepartmentId] = useState<number | undefined>(undefined)

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value)
  }
  const handleSubmit = () => {
    queryEmployee()
  }
  const queryEmployee = () => {
    $api.get(GET_EMPLOYEE_URL, { name, departmentId })
      .then(res => {
        onDataChange(res.data)
      })
  }

  useEffect(() => {
    queryEmployee()
  }, [])

  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          placeholder="姓名"
          style={{ width: 120 }}
          allowClear
          value={name}
          onChange={handleNameChange}
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="部门"
          style={{ width: 120 }}
          allowClear
          value={departmentId}
          onChange={handleDepartmentChange}
        >
          {departmentOptions.map(({ label, value }) => (
            <Select.Option key={value} value={value}>{label}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>查询</Button>
      </Form.Item>
    </Form>
  )
}

export default QueryForm