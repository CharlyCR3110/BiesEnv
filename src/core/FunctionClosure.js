import { Environment } from './Environment.js'

export class FunctionClosure {
  constructor (params, body, environment) {
    this.params = params
    this.body = body
    this.environment = environment
  }

  apply (args) {
    const localEnv = new Environment(this.environment)
    this.params.forEach((param, index) => {
      localEnv.define(param, args[index])
    })
    return { body: this.body, environment: localEnv }
  }
}
