import { Instruction } from '../Instruction.js'

export class PrintInstruction extends Instruction {
  execute (vm) {
    console.log(vm.S.pop())
  }
}
