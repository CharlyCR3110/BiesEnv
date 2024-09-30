import { Environment } from '../environment/Environment.js'

export class FunctionClosure {
  constructor (argsCount, body, environment) {
    this.argsCount = argsCount
    this.body = body
    this.environment = environment
  }

  apply (args) {
    const environment = new Environment(this.environment)
    args.forEach((arg, index) => {
      console.log(`Defining arg ${index} as ${arg}`)
      environment.define(index, arg)
      console.log(`Saving local ${index}, value: ${arg}`)
    })
    console.log(`Recent environment create ${environment}`)
    return { body: this.body, environment }
  }
}
