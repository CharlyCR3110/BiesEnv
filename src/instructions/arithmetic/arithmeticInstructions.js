import { Instruction } from '../Instruction.js'

// binary arithmetic instructions
//
export class AddInstruction extends Instruction {
  execute (vm) {
    const b = parseInt(vm.S.pop())
    const a = parseInt(vm.S.pop())
    vm.S.push(a + b)
  }
}

// mul
export class MultiplyInstruction extends Instruction {
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a * b)
  }
}

// div
export class DivideInstruction extends Instruction {
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a / b)
  }
}

// unary arithmetic instructions
// neg
export class NegateInstruction extends Instruction {
  execute (vm) {
    vm.S.push(-vm.S.pop())
  }
}

// relational instructions
// gt
export class GtInstruction extends Instruction {
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a > b ? 1 : 0)
  }
}

// unary arithmetic instruction
// sqrt
export class SqrtInstruction extends Instruction {
  execute (vm) {
    const a = vm.S.pop()
    if (a < 0) {
      throw new Error('Cannot calculate square root of a negative number')
    }
    vm.S.push(Math.sqrt(a))
  }
}


