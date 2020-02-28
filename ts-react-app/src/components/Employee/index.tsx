import React from 'react'
import { Table } from 'antd'

// import QueryForm from './QueryForm'
import QueryForm from './FuncQueryForm'
import { EmployeeResponse } from '@/interface/employee'
import { employeeColumns } from './columns'

interface State {
  employee: EmployeeResponse
}
class Employee extends React.Component<{}, State> {
  state: State = {
    employee: undefined
  }
  setEmployee = (employee: EmployeeResponse) => {
    this.setState({
      employee
    });
  }
  getTotal() {
    const total = typeof this.state.employee === 'undefined' ? 0 : this.state.employee.length
    return <p>共 {total} 名员工</p>
  }
  render() {
    return (
      <>
        <QueryForm
          onDataChange={this.setEmployee}
        />
        {this.getTotal()}
        <Table
          columns={employeeColumns}
          dataSource={this.state.employee}
        />
      </>
    )
  }
}

export default Employee