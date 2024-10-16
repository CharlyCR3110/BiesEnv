/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * Represents a single execution context with a return address and local environment.
 * This class is used to encapsulate the details of an execution context in the virtual machine,
 * including where to return after execution and the local environment's state.
 *
 * @class ExecutionContext
 * @property {number} returnAddress - The address to return to after execution.
 * @property {Environment} localEnvironment - The local environment associated with this context.
 * @example
 * const env = new Environment()
 * const context = new ExecutionContext(10, env)
 * context.returnAddress // 10
 */
export class ExecutionContext {
  /**
   * Creates an instance of the ExecutionContext class.
   *
   * @param {number} returnAddress - The return address for the context.
   * @param {Environment} localEnvironment - The local environment for the context.
   */
  constructor (returnAddress, localEnvironment) {
    this.returnAddress = returnAddress
    this.localEnvironment = localEnvironment
  }
}
