import React from 'react'
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
// import FormComponentProps from 'antd/lib/form'

import { EmployeeRequest } from '@/interface/employee'
import { departmentOptions } from './departmentOptions'

interface Props extends FormComponentProps {
  getData(param: EmployeeRequest, callback: () => void): void;
  setLoading(payload: boolean): void;
}

// type State = EmployeeRequest 

class QueryForm extends React.Component<Props, EmployeeRequest> {
  state: EmployeeRequest = {
    name: '',
    departmentId: undefined,
  }
  handleSubmit = () => {
    this.queryEmployee(this.state)
  }
  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: e.currentTarget.value
    })
  }
  handleDepartmentChange = (value: number) => {
    this.setState({
      departmentId: value
    })
  }
  queryEmployee(param: EmployeeRequest) {
    this.props.setLoading(true)
    this.props.getData(param, () => {
      this.props.setLoading(false)
    })
  }
  componentDidMount() {
    this.queryEmployee(this.state)
  }
  render() {
    return (
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="姓名"
            style={{ width: 120 }}
            allowClear
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="部门"
            style={{ width: 120 }}
            allowClear
            value={this.state.departmentId}
            onChange={this.handleDepartmentChange}
          >
            {departmentOptions.map(({ label, value }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit}>查询</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<Props>({
  name: 'employee_query'
})(QueryForm)
