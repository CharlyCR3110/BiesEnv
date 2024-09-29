import { BindingStack } from '../core/bindings/BindingStack.js'
import { FunctionClosure } from '../core/bindings/FunctionClosure.js'
import { ContextStack } from '../core/context/ContextStack.js'
import { Stack } from '../core/stack/Stack.js'

export class VM {
  constructor () {
    this.S = new Stack() // main stack
    this.C = [] // running code
    this.B = new BindingStack() // bindings
    this.D = new ContextStack() // context stack

    this.functions = {} // functions (hoisted)
    this.halted = false
  }

  loadProgram (instructions) {
    console.log(`loading program with: ${instructions}`)
    // instructions is an array of objects with op and args properties
    // if args is not present, it defaults to an empty array
    if (instructions.length === 0) {
      throw new Error('No instructions to load')
    }

    this.C = instructions
  }

  run () {
    console.log(`Running program with ${this.C.length} instructions`)
    while (this.D.currentInstructionPointer < this.C.length && !this.halted) {
      const instruction = this.C[this.D.currentInstructionPointer]
      instruction.execute(this)
      if (!this.halted) {
        this.D.updateInstructionPointer(this.D.currentInstructionPointer + 1)
      }
    }
  }

  defineFunction (name, params, body) {
    console.log(`Defining function ${name} with ${params.length} parameters`)
    this.functions[name] = new FunctionClosure(params, body, this.B.frames.peek())
  }
}
