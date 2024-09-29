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
      console.log(`Defining arg${index} as ${arg}`)
      environment.define(`arg${index}`, arg)
    })
    return { body: this.body, environment }
  }
}
