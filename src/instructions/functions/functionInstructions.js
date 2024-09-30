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

    console.log(`Function ${functionName}`, func)
    const args = []

    for (let i = 0; i < 1; i++) {
      args.unshift(vm.S.pop())
    }

    const { body, environment } = func.apply(args)
    vm.D.push(vm.D.currentInstructionPointer, vm.B.frames.peek())
    vm.B.frames.push(environment)
    Object.entries(environment.bindings).forEach(([key, value]) => {
      vm.B.define(key, value)
    })
    vm.D.lastInstructions = vm.C
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
    vm.C = vm.D.lastInstructions
    const context = vm.D.pop()
    try {
      vm.B.popFrame()
    } catch (error) {
    }
    vm.D.updateInstructionPointer(context.returnAddress)
    console.log('Returning from function')
    console.log(`Return value: ${returnValue}`)

    console.log('Instructions left: ')
    console.log(vm.C)
    vm.S.push(returnValue)
  }
}
