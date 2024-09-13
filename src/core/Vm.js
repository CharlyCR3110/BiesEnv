// src/core/vm.js

import { Stack } from './Stack.js'
import { Context } from './Context.js'

/**
 * The Virtual Machine class is responsible for executing instructions and managing the execution state.
 * @class
 * @property {Stack} stack - The stack used for managing operations and temporary states.
 * @property {Context} context - The context that provides the current execution context.
 * @example
 * const vm = new VM();
 * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
 * console.log(vm.stack.printStack()); // Prints result after operations
 */
export class VM {
  /**
   * Creates an instance of VM with an empty stack and context.
   * @memberof VM
   * @constructor
   * @example
   * const vm = new VM();
   */
  constructor () {
    this.stack = new Stack()
    this.context = new Context()
  }

  /**
   * Executes a list of instructions.
   * @param {Array} instructions - The instructions to execute.
   * @memberof VM
   * @example
   * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
   */
  execute (instructions) {
    instructions.forEach(instruction => {
      this.processInstruction(instruction)
    })
  }

  /**
   * Processes a single instruction.
   * @param {Object} instruction - The instruction to process.
   * @memberof VM
   * @example
   * vm.processInstruction({ op: 'push', value: 5 });
   */
  processInstruction (instruction) {
    switch (instruction.op) {
      case 'push':
        this.stack.push(instruction.value)
        break
      case 'pop':
        this.stack.pop()
        break
      case 'add': {
        const a = this.stack.pop()
        const b = this.stack.pop()
        this.stack.push(a + b)
        break
      }
      case 'subtract': {
        const x = this.stack.pop()
        const y = this.stack.pop()
        this.stack.push(x - y)
      }
        break
      case 'multiply': {
        const m = this.stack.pop()
        const n = this.stack.pop()
        this.stack.push(m * n)
      }
        break
      case 'divide':{
        const d1 = this.stack.pop()
        const d2 = this.stack.pop()
        if (d2 === 0) throw new Error('Division by zero.')
        this.stack.push(d1 / d2)
        break
      }
      case 'set':
        this.context.setVariable(instruction.name, instruction.value)
        break
      case 'get':{
        const value = this.context.getVariable(instruction.name)
        this.stack.push(value)
        break
      }
      case 'print':
        console.log(this.stack.printStack())
        break
      default:
        throw new Error(`Unknown operation: ${instruction.op}`)
    }
  }
}
