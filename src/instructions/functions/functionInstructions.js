import { Instruction } from '../Instruction.js'

export class LdfInstruction extends Instruction {
  execute (vm) {
    vm.S.push(this.args[0])
  }
}

export class AppInstruction extends Instruction {
  execute (vm) {
    const functionName = vm.S.pop()
    const func = vm.functions[functionName]
    if (!func) {
      throw new Error(`Function ${functionName} not found`)
    }

    const args = []
    for (let i = 0; i < func.params.length; i++) {
      args.unshift(vm.S.pop())
    }

    const { body, environment } = func.apply(args)
    vm.D.push(vm.D.currentInstructionPointer, vm.B.frames[vm.B.frames.length - 1])
    vm.B.pushFrame()
    Object.entries(environment.bindings).forEach(([key, value]) => {
      vm.B.define(key, value)
    })
    vm.C = body
    vm.D.updateInstructionPointer(0)
  }
}

export class RetInstruction extends Instruction {
  execute (vm) {
    const returnValue = vm.S.pop()
    const context = vm.D.pop()
    vm.B.popFrame()
    vm.D.updateInstructionPointer(context.returnAddress)
    vm.S.push(returnValue)
  }
}
