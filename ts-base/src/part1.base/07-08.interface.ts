interface List {
  readonly id: number;
  name: string;
  age?: number;
}
interface Result {
  data: List[];
}
function render(result: Result) {
  result.data.forEach(({ id, name, age }) => {
    conosle.log(id, name);
    if (age) {
      console.log(age);
    }
  });
}
let result: Result = {
  data: [
    { id: 1, name: 'A', sex: 'male' },
    { id: 2, name: 'B', age: 10 }
  ]
}
render(result)

interface StringArray {
  [index: number]: string
}
let chars: StringArray = ['a', 'b']
// let objChar: StringArray = { 1: 'a', 2: 'b' }

interface Names {
  [x: string]: any
  [z: number]: number
}

// let add: (x: number, y: number) => number
// interface Add {
//   (x: number, y: number): number
// }
// type Add = (x: number, y: number): number // '=>' expected
type Add = (x: number, y: number) => number
let add: Add = (a: number, b: number) => a + b // 入参的类型必须标明

interface Lib {
  (): void
  version: string
  doSomething(): void
}

function getLib() {
  let lib = () as Lib
  lib.version = '1.0.0'
  lib.doSomething = () => {}
  return lib
}
let lib1 = getLib()
lib()
let lib2 = getLib()
lib2.doSomething()