// src/core/vm.js

import { Stack } from '../Stack.js'
import { Context } from '../Context.js'
import { instructionHandlers } from './instructions.js'
import InstructionBuilderVisitor from '../../asm/InstructionBuilderVisitor.js'
import BiesASMParser from '../../asm/grammar/.antlr/biesASMParser.js'
import BiesASMLexer from '../../asm/grammar/.antlr/biesASMLexer.js'
import antlr4 from 'antlr4'

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
    this.contexts = new Stack() // Stack of contexts
    this.contexts.push(new Context()) // Initial context
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

  executeParsedCode (input) {
    const chars = new antlr4.InputStream(input)
    const lexer = new BiesASMLexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)

    const parser = new BiesASMParser(tokens)
    const tree = parser.program()

    const visitor = new InstructionBuilderVisitor()
    const instructions = visitor.visit(tree)

    this.execute(instructions)
  }
}
