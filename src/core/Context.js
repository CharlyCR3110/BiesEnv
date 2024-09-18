// src/core/context.js

/**
 * This class represents a context in which variables are stored.
 * @class
 * @property {Object} variables - The local variables of the current context.
 * @property {Context} parent - The parent context.
 * @example
 * const context = new Context()
 * context.setVariable('x', 5)
 * context.getVariable('x') // 5
 * context.hasVariable('x') // true
 * context.hasVariable('y') // false
 */
export class Context {
  /**
   * Creates an instance of Context.
   * @param {Object} [parent=null] - The parent context.
   * @memberof Context
   * @constructor
   * @example
   * const context = new Context()
   */
  constructor (parent = null) {
    this.variables = {} // local variables
    this.parent = parent // parent context
  }

  /**
   * Set a variable in the current context.
   * @param {string} name - The name of the variable.
   * @param {any} value - The value of the variable.
   * @memberof Context
   * @example
   * context.setVariable('x', 5)
   */
  setVariable (name, value) {
    this.variables[name] = value
  }

  /**
   * Get the value of a variable in the current context or in the parent context.
   * @param {string} name - The name of the variable.
   * @returns {any} - The value of the variable, or undefined if the variable is not defined.
   * @memberof Context
   * @example
   * context.setVariable('x', 5)
   * context.getVariable('x') // 5
   */
  getVariable (name) {
    if (name in this.variables) {
      return this.variables[name]
    } else if (this.parent) {
      return this.parent.getVariable(name)
    } else {
      throw new Error(`Context: Variable ${name} is not defined`)
    }
  }

  /**
   * Check if a variable is defined in the current context or in the parent context.
   * @param {string} name - The name of the variable.
   * @returns {boolean} - Whether the variable is defined.
   */
  hasVariable (name) {
    // if `name` is in the local variables or in the parent context
    return name in this.variables || (this.parent && this.parent.hasVariable(name))
  }
}
