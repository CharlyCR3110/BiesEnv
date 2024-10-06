import { Instruction } from '../Instruction.js'

export class PopInstruction extends Instruction {
  execute (vm) {
    vm.S.pop()
  }
}

// ldv
export class PushInstruction extends Instruction {
  execute (vm) {
    vm.S.push(this.args[0])
  }
}

// bld
export class BldInstruction extends Instruction {
  execute (vm) {
    const [contextIndex, variableIndex] = this.args
    const value = vm.B.frames.peek().lookup(contextIndex, variableIndex)
    console.log(`ContextIndex ${contextIndex}, VariableIndex ${variableIndex}`)
    console.log('Frame: ', vm.B.frames.peek())
    console.log(value)
    vm.S.push(value)
  }
}

// bst
export class BstInstruction extends Instruction {
  execute (vm) {
    const value = vm.S.pop()
    const [contextIndex, variableIndex] = this.args
    vm.B.getFrame(contextIndex).define(variableIndex, value)
    console.log(`Saving local ${contextIndex} , ${variableIndex}, value: ${value}`)
  }
}
