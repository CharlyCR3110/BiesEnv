// src/core/vm.js

import { Stack } from '../Stack.js'
import { Context } from '../Context.js'
import { instructionHandlers } from './instructions.js'
import InstructionBuilderVisitor from '../../asm/InstructionBuilderVisitor.js'
import BiesASMParser from '../../asm/grammar/.antlr/biesASMParser.js'
import BiesASMLexer from '../../asm/grammar/.antlr/biesASMLexer.js'
import antlr4 from 'antlr4'
import PrintVisitor from '../../asm/PrintVisitor.js'

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
    this.contexts = new Stack() // Stack of contexts (each function call will have its own context)
    this.callStack = [] // Stack to keep track of function calls
    this.functions = {} // Store function definitions
    this.contexts.push(new Context()) // Initial context
  }

  /**
   * Register a function to be used in the VM.
   * @param {string} name - The name of the function.
   * @param {Function} func - The function to register.
   * @memberof VM
   * @example
   * vm.registerFunction('add', (a, b) => a + b);
   */
  registerFunction (name, func) {
    this.functions[name] = func
  }

  /**
   * Executes a list of instructions.
   * @param {Array} instructions - The instructions to execute.
   * @memberof VM
   * @example
   * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
   */
  execute (instructions) {
    if (!instructions) {
      throw new Error('Instructions cannot be null or undefined')
    }

    this.instructions = instructions
    this.instructionPointer = 0

    while (this.instructionPointer < this.instructions?.length) {
      const instruction = this.instructions[this.instructionPointer]
      this.processInstruction(instruction)
      this.instructionPointer++
    }
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

  executeParsedCode (tree) {
    const visitor = new InstructionBuilderVisitor()
    const instructions = visitor.visit(tree)

    this.execute(instructions)
  }

  printParsedCode (tree) {
    const visitor = new PrintVisitor()
    const instructions = visitor.visit(tree)
  }
}
