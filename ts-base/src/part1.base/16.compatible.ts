/**
 * X（目标类型） = Y（源类型），X兼容Y
 */

let s: string = 'a'
// str = null

// 接口兼容性
interface X {
  a: any
  b: any
}
interface Y {
  a: any
  b: any
  c: any 
}
let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }
x = y
// y = x

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// 1)参数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2)

// 可选参数和剩余参数
let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {}
let c = (...args: number[]) => {}
a = b
a = c
// b = a
// b = c
c = a
c = b

// 2)参数类型
let handler3 = (a: string) => {}
// hof(handler3)

interface Point3D {
  x: number
  y: number
  z: number
}
interface Point2D {
  x: number
  y: number
}
let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d
