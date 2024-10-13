import { Instruction } from '../Instruction.js'

export class PrintInstruction extends Instruction {
  execute (vm) {
    console.log(`Printing: ${vm.S.pop()}`)
  }
}

// string input instruction
// inp
export class InpInstruction extends Instruction {
  async execute (vm) {
    const input = await this.getUserInput()
    vm.S.push(input)
  }

  // Helper method to get user input from the console
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
