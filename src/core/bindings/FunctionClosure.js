import { Environment } from '../environment/Environment.js'

export class FunctionClosure {
  constructor (argsCount, body, environment, parentName) {
    this.argsCount = argsCount
    this.body = body
    this.environment = environment
    this.parentName = parentName
  }

  apply (args) {
    // const environment = new Environment(this.environment)
    console.log('Padre: ',this.environment.parent)
    args.forEach((arg, index) => {
      console.log(`Defining arg ${index} as ${arg}`)
      this.environment.define(String(index), arg)
      console.log(`Saving local ${index}, value: ${arg}`)
    })
    console.log(`Recent environment create ${this.environment}`)
    return { body: this.body, environment: this.environment }
  }
  newEnvironment(parentEnv){
    this.environment = new Environment(parentEnv)
  }
}
