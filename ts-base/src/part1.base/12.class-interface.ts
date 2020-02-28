interface Human {
  name: string
  eat(): void
}

class Asian implements Human {
  constructor(public name: string) {
    this.name = name
  }
  eat() {}
  age: number = 0
  sleep() {}
}

interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

class Auto {
  state = 1
}
interface AutoInterface extends Auto {

}
class C implements AutoInterface {
  state = 2
  state1 = 1
}
class Bus extends Auto implements AutoInterface {}

let bus: Bus = {
  state: 1,
}


