import { Context } from './Context.js'

/**
 * This class represents the environment in which code is executed.
 * @class
 * @property {Context} currentContext - The current context of the environment.
 * @example
 * const env = new Environment();
 * env.setVariable('x', 10);
 * console.log(env.getVariable('x')); // 10
 */
export class Environment {
  /**
   * Creates an instance of Environment with a global context.
   * @memberof Environment
   * @constructor
   * @example
   * const env = new Environment();
   */
  constructor () {
    this.currentContext = new Context() // Create a global context by default
  }

  /**
   * Sets a variable in the current context.
   * @param {string} name - The name of the variable.
   * @param {any} value - The value of the variable.
   * @memberof Environment
   * @example
   * env.setVariable('x', 10);
   */
  setVariable (name, value) {
    this.currentContext.setVariable(name, value)
  }

  /**
   * Gets the value of a variable from the current context.
   * @param {string} name - The name of the variable.
   * @returns {any} - The value of the variable.
   * @memberof Environment
   * @example
   * env.setVariable('x', 10);
   * console.log(env.getVariable('x')); // 10
   */
  getVariable (name) {
    return this.currentContext.getVariable(name)
  }

  /**
   * Checks if a variable is defined in the current context.
   * @param {string} name - The name of the variable.
   * @returns {boolean} - Whether the variable is defined.
   * @memberof Environment
   * @example
   * env.setVariable('x', 10);
   * console.log(env.hasVariable('x')); // true
   */
  hasVariable (name) {
    return this.currentContext.hasVariable(name)
  }

  /**
   * Creates a new context and sets it as the current context.
   * @memberof Environment
   * @example
   * env.pushContext();
   * env.setVariable('y', 20);
   * console.log(env.getVariable('y')); // 20
   * env.popContext();
   * console.log(env.hasVariable('y')); // false
   */
  pushContext () {
    this.currentContext = new Context(this.currentContext)
  }

  /**
   * Restores the previous context.
   * @memberof Environment
   * @example
   * env.popContext();
   */
  popContext () {
    if (this.currentContext.parent) {
      this.currentContext = this.currentContext.parent
    } else {
      throw new Error('No parent context to pop.')
    }
  }
}
