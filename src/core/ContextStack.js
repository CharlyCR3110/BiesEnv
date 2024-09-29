import { ExecutionContext } from './ExecutionContext.js'
import { Stack } from './Stack.js'

export class ContextStack {
  constructor () {
    this.contexts = new Stack()
    this.currentInstructionPointer = 0
  }

  push (returnAddress, localEnvironment) {
    this.contexts.push(new ExecutionContext(returnAddress, localEnvironment))
  }

  pop () {
    if (!this.contexts.isEmpty()) {
      return this.contexts.pop()
    }
    throw new Error('Context stack is empty')
  }

  get current () {
    return this.contexts.peek()
  }

  updateInstructionPointer (newPointer) {
    this.currentInstructionPointer = newPointer
  }
}
