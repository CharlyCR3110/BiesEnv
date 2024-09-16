// src/core/vm.js

import { Stack } from '../Stack.js'
import { Context } from '../Context.js'
import { instructionHandlers } from './instructions.js'

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
    const handler = instructionHandlers[instruction.op] || instructionHandlers.default
    handler(this, instruction)
  }
}
