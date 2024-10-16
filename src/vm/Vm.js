import { BindingStack } from '../core/bindings/BindingStack.js'
import { ContextStack } from '../core/context/ContextStack.js'
import { Stack } from '../core/stack/Stack.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

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
  /**
   * Creates an instance of the VM (Virtual Machine).
   * @param {number} [traceLevel=0] - The level of tracing to be used for debugging.
   */
  constructor (traceLevel = 0) {
    this.S = new Stack() // main stack
    this.C = [] // running code
    this.B = new BindingStack() // bindings
    this.D = new ContextStack() // context stack

    this.functions = {} // functions (hoisted)
    this.halted = false

    this.traceLevel = traceLevel
  }

  /**
   * Loads a program into the virtual machine.
   * @param {Array<Object>} instructions - An array of instruction objects with op and args properties.
   * @throws {Error} Throws an error if no instructions are provided.
   */
  loadProgram (instructions) {
    console.log(`loading program with: ${instructions}`)
    // instructions is an array of objects with op and args properties
    // if args is not present, it defaults to an empty array
    if (instructions.length === 0) {
      throw new Error('No instructions to load')
    }

    this.C = instructions
  }

  /**
   * Executes the loaded program instructions.

   * This method processes instructions until either all instructions are executed
   * or the virtual machine is halted.
   */
  async run () {
    console.log(`Running program with ${this.C.length} instructions`)
    console.log(this.functions)
    while (this.D.currentInstructionPointer < this.C.length && !this.halted) {
      const instruction = this.C[this.D.currentInstructionPointer]

      if (this.traceLevel > 0) {
        console.error(`Executing instruction: ${instruction.constructor.name}`)
      }

      try {
        await instruction.execute(this);
      } catch (error) {
        console.error(`Error executing instruction: ${error.message}`)
        this.halted = true
      }

      if (!this.halted) {
        this.D.updateInstructionPointer(this.D.currentInstructionPointer + 1)
      }
    }
  }

  /**
   * Defines a function within the virtual machine.
   * @param {string} name - The name of the function to be defined.
   * @param {Function} closure - The function implementation (closure) to be associated with the name.
   */
  defineFunction (name, closure) {
    console.log(`Defining function ${name}`)
    this.functions[name] = closure
  }
}
