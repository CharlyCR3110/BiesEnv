import { VM } from '../core/vm/Vm.js'
import { loadCode } from './loader.js'

/**
 * Runner to execute or print code using the virtual machine.
 * @module interpreter/runner
 */

/**
 * Runs a source code file using the virtual machine.
 * @param {string} filePath - Path to the source code file.
 * @throws {Error} - If there is an issue loading or executing the code.
 * @example
 * run('examples/01.basm')
 */
export const run = (filePath) => {
  try {
    console.log('Running the code in path:', filePath)
    // Load, parse, and link the source code into an executable format (array of instructions)
    const [instructions, functions] = loadCode(filePath)

    // Create a new instance of the virtual machine
    const vm = new VM()

    // Get the first function to execute
    const keys = Object.keys(functions)
    const firstElement = functions[keys[0]]

    const functionInstructions = firstElement?.instructions || null

    // Execute the parsed code
    functionInstructions ? vm.execute(functionInstructions) : vm.execute(instructions) // this allows the user to run the code with or without functions (no need of $FUN...$END)

    console.log('Execution completed successfully.')
  } catch (error) {
    console.error(`Error running the code: ${error.message}`)
  }
}

/**
 * Prints a source code file using the print visitor.
 * @param {string} filePath - Path to the source code file.
 * @throws {Error} - If there is an issue loading or printing the code.
 * @example
 * print('examples/01.basm')
 */
export const print = (filePath) => {
  try {
    console.log('Printing the code in path:', filePath)
    // Load, parse, and link the source code into an executable format (array of instructions)
    const [instructions, functions] = loadCode(filePath)

    console.log('--INSTRUCTIONS--')
    instructions.forEach(instruction => {
      console.log(instruction)
    })

    console.log('--FUNCTIONS--')
    console.log(functions)

    console.log('Printing completed successfully.')
  } catch (error) {
    console.error(`Error printing the code: ${error.message}`)
  }
}
