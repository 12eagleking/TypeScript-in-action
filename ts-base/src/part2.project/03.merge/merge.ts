interface A {
  x: number;
  foo(bar: number): number;
  foo(bar: 'a'): string;
}
interface A {
  y: number;
  foo(bar: string): string;
  foo(bar: string[]): string[];
  foo(bar: 'b'): string;
}
let a: A = {
  x: 1,
  y: 1,
  foo(bar: any) {
    return bar;
  }
}


class C {}
namespace C {
  export let state = 1
}
console.log(C.state)

function Lib() {}
namespace Lib {
  export let version = '1.0'
}
console.log(Lib.version)

enum Color {
  Red,
  Yellow,
  Blue
}
namespace Color {
  export function mix() {}
}
console.log(Color)