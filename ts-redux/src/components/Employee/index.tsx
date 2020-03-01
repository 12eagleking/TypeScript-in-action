import React from 'react'
import {
  Table,
  Button,
} from 'antd'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import {
  connect,
} from 'react-redux'

import QueryForm from './QueryForm'
// import QueryForm from './FuncQueryForm'
import {
  EmployeeResponse,
  EmployeeInfo,
  DeleteRequest,
  EmployeeRequest,
  CreateRequest,
  UpdateRequest
} from '@/interface/employee'
import { getColumns } from './columns'
import {
  deleteEmployee,
  updateEmployee,
  getEmployee,
  createEmployee,
} from '@/redux/employee'
import InfoModal from './InfoModal'

interface Props {
  employeeList: EmployeeResponse;
  onDeleteEmployee(record: DeleteRequest): void;
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
}

interface State {
  loading: boolean;
  showModal: boolean;
  edit: boolean;
  rowData: Partial<EmployeeInfo>;
}
class Employee extends React.Component<Props, State> {
  state: State = {
    loading: false,
    showModal: false,
    edit: false,
    rowData: {},
  }
  setLoading = (payload: boolean) => {
    this.setState({
      loading: payload
    });
  }
  hideModal = () => {
    this.setState({
      showModal: false,
      rowData: {}
    })
  }
  getTotal() {
    const list = this.props.employeeList
    const total = (typeof list === 'undefined') ? 0 : list.length
    return <p>共 {total} 名员工</p>
  }
  handleUpdate = () => {}
  handleDelete = (record: DeleteRequest) => {
    this.props.onDeleteEmployee(record)
  }
  handleCreate = () => {
    this.setState({
      showModal: true,
      edit: false,
      rowData: {}
    })
  }
  render() {
    const {
      onGetEmployee,
      onCreateEmployee,
      onDeleteEmployee,
      onUpdateEmployee,
    } = this.props;
    return (
      <>
        <QueryForm
          getData={onGetEmployee}
          setLoading={this.setLoading}
        />
        <div className="toolbar">
          <Button type="primary" icon="plus" onClick={this.handleCreate}>添加新员工</Button>
        </div>
        <InfoModal
          visible={this.state.showModal}
          edit={this.state.edit}
          rowData={this.state.rowData}
          hide={this.hideModal}
          createData={onCreateEmployee}
          updateData={onUpdateEmployee}
        />
        {this.getTotal()}
        <Table
          columns={getColumns(this.handleUpdate, this.handleDelete)}
          dataSource={this.props.employeeList}
          loading={this.state.loading}
        />
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({ // TODO: state类型？
  employeeList: state.employee.employeeList
})
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ // TODO: 参数类型设置？
  onDeleteEmployee: deleteEmployee,
  onUpdateEmployee: updateEmployee,
  onGetEmployee: getEmployee,
  onCreateEmployee: createEmployee,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Employee)