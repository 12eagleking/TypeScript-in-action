import React from 'react'
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
// import FormComponentProps from 'antd/lib/form'

import { EmployeeRequest, EmployeeResponse } from '@/interface/employee'
import { departmentOptions } from './departmentOptions'
import * as $api from '@/utils/request'
import { GET_EMPLOYEE_URL } from '@/constants/urls'

interface Props extends FormComponentProps {
  onDataChange(data: EmployeeResponse): void
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
    // // TODO: ajax request
    // this.props.onDataChange(undefined)
    $api.get(GET_EMPLOYEE_URL, param)
      .then(res => {
        this.props.onDataChange(res.data)
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

// export default Form.create({})(QueryForm)

// const WrapQueryForm = Form.create<Props>({
//   name: 'employee_query'
// })(QueryForm);

// export default WrapQueryForm;