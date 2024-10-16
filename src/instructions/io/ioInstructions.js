import { Instruction } from '../Instruction.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */

/**
 * Represents an instruction to print a value from the stack.
 * @class
 * @extends Instruction
 * @classdesc The PrintInstruction class implements the execution of the print operation,
 * outputting the top value from the stack to the console.
 */
export class PrintInstruction extends Instruction {
  /**
   * Executes the print operation.
   * This method pops the top value from the stack and prints it to the console.
   * @param {object} vm - The virtual machine instance.
   * @memberof PrintInstruction
   * @example
   * const printInstruction = new PrintInstruction();
   * printInstruction.execute(vm);
   */
  execute (vm) {
    console.log(`Printing: ${vm.S.pop()}`)
  }
}

// string input instruction
// inp
/**
 * Represents an instruction to read user input.
 * @class
 * @extends Instruction
 * @classdesc The InpInstruction class implements the execution of the input operation,
 * allowing the user to provide a string value to be pushed onto the stack.
 */
export class InpInstruction extends Instruction {
  /**
   * Executes the input operation.
   * This method prompts the user for input asynchronously and pushes the input onto the stack.
   * @param {object} vm - The virtual machine instance.
   * @memberof InpInstruction
   * @example
   * const inpInstruction = new InpInstruction();
   * inpInstruction.execute(vm);
   */
  async execute (vm) {
    const input = await this.getUserInput()
    vm.S.push(input)
  }

  /**
   * Helper method to get user input from the console.
   * This method returns a promise that resolves with the user's input.
   * @returns {Promise<string>} A promise that resolves to the user input.
   * @memberof InpInstruction
   */
  getUserInput () {
    return new Promise((resolve) => {
      // Create a readline interface to read from the console
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })

      // Ask the user for input
      readline.question('Enter a value: ', (value) => {
        readline.close()
        resolve(value) // Resolve the promise with the user input
      })
    })
  }
}
