/**
 * Represents a single execution context with a return address and local environment.
 * @class
 * @property {number} returnAddress - The address to return to after execution.
 * @property {Environment} localEnvironment - The local environment.
 * @example
 * const env = new Environment()
 * const context = new ExecutionContext(10, env)
 * context.returnAddress // 10
 */
export class ExecutionContext {
  constructor (returnAddress, localEnvironment) {
    this.returnAddress = returnAddress
    this.localEnvironment = localEnvironment
  }
}
