import { Instruction } from '../Instruction.js'

export class LdfInstruction extends Instruction {
  execute (vm) {
    const func = vm.functions[this.args[0]]
    const parentFunc = vm.functions[func.parentName]
    console.log(`Padre: ${JSON.stringify(parentFunc)}`)
    func.newEnvironment(parentFunc.environment)
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
    console.log('argsCount: ', func.argsCount)
    for (let i = 0; i < func.argsCount; i++) {
      args.unshift(vm.S.pop())
    }

    const { body, environment } = func.apply(args)
    vm.D.push(vm.D.currentInstructionPointer, vm.B.frames.peek())
    vm.B.frames.push(environment)
    console.log('Environment of the before entries')
    console.log(environment)
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

export class CstInstruction extends Instruction {
  execute (vm) {
    const value = vm.S.pop()
    const type = this.args[0]

    if (type === 'int') {
      vm.S.push(parseInt(value, 10))
    } else if (type === 'float') {
      vm.S.push(parseFloat(value))
    } else if (type === 'string') {
      vm.S.push(value.toString())
    }
    // Agregar más tipos si es necesario
  }
}
