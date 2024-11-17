import { Instruction } from '../Instruction.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */

/**
 * Represents an instruction to load a function definition.
 * @class
 * @extends Instruction
 * @classdesc The LdfInstruction class implements the execution of the load function operation,
 * loading a function and setting up its environment.
 */
export class LdfInstruction extends Instruction {
  /**
   * Executes the load function operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof LdfInstruction
   * @example
   * const ldfInstruction = new LdfInstruction();
   * ldfInstruction.execute(vm);
   */
  execute (vm) {
    const func = vm.functions[this.args[0]]
    const parentFunc = vm.functions[func.parentName]
    // console.log(`Padre: ${JSON.stringify(parentFunc)}`)
    func.newEnvironment(parentFunc.environment)
    vm.S.push(this.args[0])
  }
}

/**
 * Represents an instruction to apply a function.
 * @class
 * @extends Instruction
 * @classdesc The AppInstruction class implements the execution of the apply function operation,
 * retrieving the function from the stack and executing it with the given arguments.
 */
export class AppInstruction extends Instruction {
  /**
   * Executes the apply function operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof AppInstruction
   * @example
   * const appInstruction = new AppInstruction();
   * appInstruction.execute(vm);
   */
  execute (vm) {
    const functionName = vm.S.pop()
    const func = vm.functions[functionName] // func : FunctionClosure
    if (!func) {
      throw new Error(`Function ${functionName} not found`)
    }

    // console.log(`Function ${functionName}`, func)
    const args = []
    // console.log('argsCount: ', func.argsCount)
    for (let i = 0; i < func.argsCount; i++) {
      args.unshift(vm.S.pop())
    }

    const { body, environment } = func.apply(args)
    vm.D.push(vm.D.currentInstructionPointer, vm.B.frames.peek())
    vm.B.frames.push(environment)
    // console.log('Environment of the before entries')
    // console.log(environment)
    Object.entries(environment.bindings).forEach(([key, value]) => {
      vm.B.define(key, value)
    })
    vm.D.lastInstructions.push(vm.C)
    vm.C = body
    vm.D.updateInstructionPointer(-1)

    // show environment of the function
    // console.log('Environment of the function')
    // console.log(environment)
  }
}

/**
 * Represents an instruction to return from a function.
 * @class
 * @extends Instruction
 * @classdesc The RetInstruction class implements the execution of the return operation,
 * retrieving the return value and restoring the previous execution context.
 */
export class RetInstruction extends Instruction {
  /**
   * Executes the return operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof RetInstruction
   * @example
   * const retInstruction = new RetInstruction();
   * retInstruction.execute(vm);
   */
  execute (vm) {
    const returnValue = !vm.S.isEmpty()
      ? vm.S.pop()
      : {}
    vm.C = vm.D.lastInstructions.pop()
    const context = vm.D.pop()
    try {
      vm.B.popFrame()
      // console.log('Frame successfully deleted')
    } catch (error) {
      // console.log('Error deleting frames')
    }
    vm.D.updateInstructionPointer(context.returnAddress)
    // console.log(context.returnAddress)
    // console.log('Returning from function')
    // console.log(`Return value: ${returnValue}`)

    // console.log('Instructions left: ')
    // console.log(vm.C)
    vm.S.push(returnValue)
  }
}

/**
 * Represents an instruction to create a constant value.
 * @class
 * @extends Instruction
 * @classdesc The CstInstruction class implements the execution of the constant value creation operation,
 * pushing a value of a specified type onto the stack.
 */
export class CstInstruction extends Instruction {
  /**
   * Executes the constant value creation operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof CstInstruction
   * @example
   * const cstInstruction = new CstInstruction();
   * cstInstruction.execute(vm);
   */
  execute (vm) {
    const value = vm.S.pop()
    const type = this.args[0]

    if (type === 'int') {
      const sanitizedValue = value.slice(1, -1)
      vm.S.push(parseInt(sanitizedValue, 10))
    } else if (type === 'float') {
      const sanitizedValue = value.slice(1, -1)
      vm.S.push(parseFloat(sanitizedValue))
    } else if (type === 'string') {
      vm.S.push(value.toString())
    }
    // Agregar más tipos si es necesario
  }
}
