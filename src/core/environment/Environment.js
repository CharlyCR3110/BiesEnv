/**
 * Represents a single scope or environment for variable bindings.
 * @class
 * @property {Map<string, any>} bindings - A map of variable names to values.
 * @property {Environment} parent - The parent environment, or null if this is the global environment.
 * @example
 * const env = new Environment()
 * env.define('x', 10)
 * env.lookup('x') // 10
 */
export class Environment {
  constructor (parent = null) {
    this.bindings = new Map()
    this.parent = parent
  }

  define (name, value) {
    this.bindings.set(name, value)
  }

  lookup (name) {
    if (this.bindings.has(name)) {
      return this.bindings.get(name)
    }
    if (this.parent) {
      return this.parent.lookup(name)
    }
    throw new Error(`Undefined variable: ${name}`)
  }
}
