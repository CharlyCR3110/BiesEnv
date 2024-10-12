import { BindingStack } from '../core/bindings/BindingStack.js'
import { ContextStack } from '../core/context/ContextStack.js'
import { Stack } from '../core/stack/Stack.js'

/**
 * Virtual machine for executing instructions.
 * @module vm/Vm
 * @see {@link Stack}
 * @see {@link BindingStack}
 * @see {@link ContextStack}
 *
 * @example
 * const vm = new VM()
 * vm.loadProgram(instructions)
 */
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
    console.log(this.functions)
    while (this.D.currentInstructionPointer < this.C.length && !this.halted) {
      console.log('---'.repeat(20))
      console.log(`Instruction pointer: ${this.D.currentInstructionPointer}`)
      console.log(`Instruction: ${this.C[this.D.currentInstructionPointer].constructor.name}`)
      console.log(`Args: ${this.C[this.D.currentInstructionPointer].args}`)
      console.log(`Stack: ${[...this.S.items]}`)
      for (let index = 0; index < this.B.frames.size(); index++) {
        console.log('Frame ' + index + ': ', this.B.getFrame(index))
      }
      console.log('---'.repeat(20))
      const instruction = this.C[this.D.currentInstructionPointer]
      instruction.execute(this)
      if (!this.halted) {
        this.D.updateInstructionPointer(this.D.currentInstructionPointer + 1)
      }
    }
  }

  defineFunction (name, closure) {
    console.log(`Defining function ${name}`)
    this.functions[name] = closure
  }
}
