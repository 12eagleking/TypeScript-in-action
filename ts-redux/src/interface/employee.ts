export interface EmployeeRequest {
  name: string;
  departmentId: number | undefined;
}

export interface EmployeeInfo {
  id: number;
  key: number;
  name: string;
  department: string;
  departmentId: number;
  hiredate: string;
  level: string;
  levelId: number;
}

export type EmployeeResponse = EmployeeInfo[] | undefined

export interface CreateRequest {
  name: string;
  departmentId: number;
  hiredate: string;
  levelId: number;
}

export interface DeleteRequest {
  id: number;
}

// export interface UpdateRequest extends CreateRequest, DeleteRequest {
// }

export type UpdateRequest = CreateRequest & DeleteRequest