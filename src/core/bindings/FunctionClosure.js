import { Environment } from '../environment/Environment.js'

/**
 * Represents a function closure that encapsulates the function's
 * body, its argument count, and the environment in which it was created.
 * This class allows for function execution within its specific scope.
 * @class FunctionClosure
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */
export class FunctionClosure {
  /**
   * Creates an instance of FunctionClosure.
   * @param {number} argsCount - The number of arguments the function accepts.
   * @param {*} body - The body of the function to be executed.
   * @param {Environment} environment - The environment where the closure is defined.
   * @param {string} parentName - The name of the parent function or context.
   */
  constructor (argsCount, body, environment, parentName) {
    this.argsCount = argsCount
    this.body = body
    this.environment = environment
    this.parentName = parentName
  }

  /**
   * Applies the closure by defining the arguments in the environment
   * and preparing the execution context.
   *
   * @param {*} args - The arguments to pass to the function.
   * @returns {{ body: *, environment: Environment }} - The function body and the current environment.
   */
  apply (args) {
    // const environment = new Environment(this.environment)
    // console.log('Padre: ', this.environment.parent)
    args.forEach((arg, index) => {
      // console.log(`Defining arg ${index} as ${arg}`)
      this.environment.define(String(index), arg)
      // console.log(`Saving local ${index}, value: ${arg}`)
    })
    // console.log(`Recent environment create ${this.environment}`)
    return { body: this.body, environment: this.environment }
  }

  /**
   * Creates a new environment based on the provided parent environment.
   *
   * @param {Environment} parentEnv - The parent environment to inherit from.
   */
  newEnvironment (parentEnv) {
    this.environment = new Environment(parentEnv)
  }
}
