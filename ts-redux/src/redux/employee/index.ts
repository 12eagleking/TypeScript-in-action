import { Dispatch } from 'redux'
// import _ from 'loddsh'

import * as $api from '@/utils/request'
import {
  EmployeeRequest,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
  EmployeeResponse,
  EmployeeInfo,
} from '@/interface/employee';
import {
  GET_EMPLOYEE_URL,
  CREATE_EMPLOYEE_URL,
  DELETE_EMPLOYEE_URL,
  UPDATE_EMPLOYEE_URL,
} from '@/constants/urls';
import {
  GET_EMPLOYEE,
  CREATE_EMPOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '@/constants/actions';
import { department, level } from '@/constants/options'

/**
 * action creator
 */
export function getEmployee(param: EmployeeRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    $api.get(GET_EMPLOYEE_URL, param)
      .then(res => {
        dispatch({
          type: GET_EMPLOYEE,
          payload: res.data
        })
        callback()
      })
  }
}

export function createEmployee(param: CreateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    $api.post(CREATE_EMPLOYEE_URL, param)
      .then(res => {
        dispatch({
          type: CREATE_EMPOYEE,
          payload: {
            name: param.name,
            department: department[param.departmentId],
            departmentId: param.departmentId,
            hiredate: param.hiredate,
            level: level[param.levelId],
            levelId: param.levelId,
            ...res.data,
          }
        })
        callback()
      })
  }
}

export function deleteEmployee(param: DeleteRequest, callback?: () => void) {
  return (dispatch: Dispatch) => {
    $api.post(DELETE_EMPLOYEE_URL, param)
      .then(res => {
        dispatch({
          type: DELETE_EMPLOYEE,
          payload: param,
        })
        callback && callback()
      })
  }
}

export function updateEmployee(param: UpdateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    $api.post(UPDATE_EMPLOYEE_URL, param)
      .then(res => {
        dispatch({
          type: UPDATE_EMPLOYEE,
          payload: param,
        })
        callback()
      })
  }
}

/**
 * reducer
 */

interface Action {
  type: string;
  payload: any;
}

interface State {
  employeeList: EmployeeResponse
}

const initialState: State = {
  employeeList: undefined
}

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload
      }
    case CREATE_EMPOYEE:
      const newList = [action.payload, ...(state.employeeList as EmployeeInfo[])]
      return {
        ...state,
        employeeList: newList,
      }
    case DELETE_EMPLOYEE:
      const employeeList = state.employeeList || []
      const deleteIndex = employeeList.findIndex(({ id }) => action.payload.id === id)
      const reducedList = [
        ...employeeList.slice(0, deleteIndex),
        ...employeeList.slice(deleteIndex)
      ]
      return {
        ...state,
        employeeList: reducedList
      }
    case UPDATE_EMPLOYEE: {
      const employeeList = state.employeeList || []
      const deleteIndex = employeeList.findIndex(({ id }) => action.payload.id === id)
      if (deleteIndex === -1) {
        return state
      } else {
        const updatedList = [
          ...employeeList.slice(0, deleteIndex),
          {
            ...action.payload,
            key: action.payload.id,
            department: department[action.payload.departmentId],
            level: level[action.payload.levelId]
          },
          ...employeeList.slice(deleteIndex)
        ]
        return updatedList
      }
    }
    default:
      return state
      
  }
}