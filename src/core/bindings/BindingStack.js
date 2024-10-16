import { Environment } from '../environment/Environment.js'
import { Stack } from '../stack/Stack.js'

/**
 * Manages a stack of environments, corresponding to the B component in the VM.
 * This class is responsible for creating and managing a stack of
 * `Environment` instances, allowing for variable definition and lookup
 * in a hierarchical structure.
 *
 * @class BindingStack
 * @property {Stack<Environment>} frames - A stack of environments.
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 * @example
 * const stack = new BindingStack()
 * stack.pushFrame()
 * stack.define('x', 10)
 * stack.lookup('x') // 10
 */
export class BindingStack {
  /**
   * Initializes a new instance of the BindingStack class,
   * creating a new stack of environments with a global environment.
   */
  constructor () {
    this.frames = new Stack()
    this.frames.push(new Environment())
  }

  /**
   * Retrieves the environment frame at the specified index from the stack.
   *
   * @param {number} index - The index of the frame to retrieve.
   * @returns {Environment} - The environment frame at the specified index.
   */
  getFrame (index) {
    return this.frames.get(index)
  }

  /**
   * Pushes a new environment frame onto the stack, inheriting from the
   * current top frame.
   */
  pushFrame () {
    this.frames.push(new Environment(this.frames.peek()))
  }

  /**
   * Pops the top environment frame off the stack. If there is only one
   * frame (the global environment), an error is thrown to prevent
   * removing the global environment.
   *
   * @throws {Error} - If attempting to pop the global environment.
   */
  popFrame () {
    if (this.frames.size() > 1) {
      this.frames.pop()
    } else {
      throw new Error('Cannot pop global environment')
    }
  }

  /**
   * Defines a variable in the current top environment frame.
   *
   * @param {string} name - The name of the variable to define.
   * @param {*} value - The value to associate with the variable.
   */
  define (name, value) {
    this.frames.peek().define(name, value)
  }

  /**
   * Looks up a variable in the current top environment frame.
   *
   * @param {string} name - The name of the variable to look up.
   * @returns {*} - The value associated with the variable, if found.
   */
  lookup (name) {
    return this.frames.peek().lookup(name)
  }
}
