import { ExecutionContext } from './ExecutionContext.js'
import { Stack } from '../stack/Stack.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * Manages the stack of execution contexts, corresponding to the D component in the VM.
 * This class allows for the pushing and popping of execution contexts and maintains
 * the current instruction pointer for the virtual machine's execution flow.
 *
 * @module ContextStack
 * @see {@link ExecutionContext}
 * @see {@link Stack}
 * @property {Stack} contexts - Stack of execution contexts.
 * @property {number} currentInstructionPointer - Current instruction pointer.
 */
export class ContextStack {
  /**
   * Initializes a new instance of the ContextStack class.
   * Sets up an empty stack for execution contexts and initializes
   * the instruction pointer to zero.
   */
  constructor () {
    this.contexts = new Stack()
    this.currentInstructionPointer = 0
    this.lastInstructions = new Stack()
  }

  /**
   * Pushes a new execution context onto the stack.
   *
   * @param {number} returnAddress - The return address for the current execution context.
   * @param {Environment} localEnvironment - The local environment associated with the context.
   */
  push (returnAddress, localEnvironment) {
    this.contexts.push(new ExecutionContext(returnAddress, localEnvironment))
  }

  /**
   * Pops the top execution context off the stack.
   *
   * @returns {ExecutionContext} - The execution context that was removed from the stack.
   * @throws {Error} - Throws an error if the context stack is empty.
   */
  pop () {
    if (!this.contexts.isEmpty()) {
      return this.contexts.pop()
    }
    throw new Error('Context stack is empty')
  }

  /**
   * Retrieves the current execution context without removing it from the stack.
   *
   * @returns {ExecutionContext} - The current execution context on the top of the stack.
   */
  get current () {
    return this.contexts.peek()
  }

  /**
   * Updates the instruction pointer to the specified value.
   *
   * @param {number} newPointer - The new instruction pointer value.
   */
  updateInstructionPointer (newPointer) {
    this.currentInstructionPointer = newPointer
  }
}
