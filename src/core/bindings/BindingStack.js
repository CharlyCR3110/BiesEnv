import { Environment } from '../environment/Environment.js'
import { Stack } from '../stack/Stack.js'

/**
 * Manages a stack of environments, corresponding to the B component in the VM.
 * @class
 * @property {Stack<Environment>} frames - A stack of environments.
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 * @example
 * const stack = new BindingStack()
 * stack.pushFrame()
 * stack.define('x', 10)
 * stack.lookup('x') // 10
 */
export class BindingStack {
  constructor () {
    this.frames = new Stack()
    this.frames.push(new Environment())
  }

  getFrame (index) {
    return this.frames.get(index)
  }

  pushFrame () {
    this.frames.push(new Environment(this.frames.peek()))
  }

  popFrame () {
    if (this.frames.size() > 1) {
      this.frames.pop()
    } else {
      throw new Error('Cannot pop global environment')
    }
  }

  define (name, value) {
    this.frames.peek().define(name, value)
  }

  lookup (name) {
    return this.frames.peek().lookup(name)
  }
}
