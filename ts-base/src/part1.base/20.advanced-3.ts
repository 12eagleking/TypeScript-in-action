/**
 * 映射类型
 */
interface Obj {
  a: string;
  b: string;
}
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// }
type ReadonlyObj = Readonly<Obj>
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// }
type PartialObj = Partial<Obj>
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// }
type PickObj = Pick<Obj, 'a' | 'b'>
// // Construct a type with a set of properties K of type T
// type Record<K extends keyof any, T> = {
//   [P in K]: T; 
// } 
type RecordObj = Record<'x' | 'y', Obj>