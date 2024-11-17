/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * Represents a single scope or environment for variable bindings.
 * This class is responsible for storing variable names and their corresponding values,
 * as well as providing access to variables defined in parent environments.
 *
 * @class Environment
 * @property {Map<string, any>} bindings - A map of variable names to their associated values.
 * @property {Environment} parent - The parent environment, or null if this is the global environment.
 * @example
 * const env = new Environment()
 * env.define('x', 10)
 * env.lookup('x') // 10
 */
export class Environment {
  /**
   * Creates an instance of the Environment class.
   *
   * @param {Environment|null} parent - The parent environment to inherit from, or null for the global environment.
   */
  constructor (parent = null) {
    this.bindings = new Map()
    this.parent = parent
  }

  /**
   * Defines a variable in the current environment with the specified name and value.
   *
   * @param {string} name - The name of the variable to define.
   * @param {any} value - The value to associate with the variable name.
   */
  define (name, value) {
    this.bindings.set(name, value)
  }

  /**
   * Looks up the value of a variable by name, searching through the current environment
   * and its parent environments if necessary.
   *
   * @param {number|string} level - The level of the environment to check;
   *                                it should be '0' for the current environment.
   * @param {string} name - The name of the variable to look up.
   * @returns {any} The value associated with the variable name.
   * @throws {Error} If the variable is not defined in the current or parent environments.
   */
  lookup (level, name) {
    // console.log('Level: ', level, level === 0, level === '0', level === '0')
    if (level === '0' && this.bindings.has(name)) return this.bindings.get(name)
    // console.log(this.bindings, `name: ${name}`)
    // console.log('Value: ', this.bindings.get(name))
    if (this.parent) {
      return this.parent.lookup('0', name)
    }
    throw new Error(`Undefined variable: ${name}`)
  }
}
