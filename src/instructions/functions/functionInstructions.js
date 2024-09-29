import { Instruction } from '../Instruction.js'

export class LdfInstruction extends Instruction {
  execute (vm) {
    vm.S.push(this.args[0])
  }
}

export class AppInstruction extends Instruction {
  execute (vm) {
    const functionName = vm.S.pop()
    const func = vm.functions[functionName] // func : FunctionClosure
    if (!func) {
      throw new Error(`Function ${functionName} not found`)
    }

    const args = []

    const { body, environment } = func.apply(args)
    vm.D.push(vm.D.currentInstructionPointer, vm.B.frames.peek())
    vm.B.pushFrame()
    Object.entries(environment.bindings).forEach(([key, value]) => {
      vm.B.define(key, value)
    })
    vm.C = body
    vm.D.updateInstructionPointer(-1)

    // show environment of the function
    console.log('Environment of the function')
    console.log(environment)
  }
}

export class RetInstruction extends Instruction {
  execute (vm) {
    const returnValue = vm.S.pop()
    const context = vm.D.pop()
    try {
      vm.B.popFrame()
    } catch (error) {
      vm.halted = true
      return
    }
    vm.D.updateInstructionPointer(context.returnAddress)
    vm.S.push(returnValue)
  }
}
