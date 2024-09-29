import { Stack } from '../Stack.js'

export class VM {
  constructor () {
    this.S = new Stack() // main stack
    this.C = [] // running code
    this.B = new Stack() // bindings
    this.D = new Stack() // context stack

    this.funtions = {} // functions (hoisted)
  }
}
