import { Instruction } from '../Instruction.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

/**
 * Represents a string manipulation instruction that retrieves a character from a string based on the given index.
 */
export class StkInstruction extends Instruction {
  /**
   * Executes the stk instruction by popping a character index from the stack and retrieving the corresponding character from the string.
   *
   * @param {Object} vm - The virtual machine instance.
   * @throws {Error} Throws an error if the types of k or str are invalid.
   */
  execute (vm) {
    // Pop 'k' from the stack, which indicates the number of characters to take.
    const k = Number(vm.S.pop())
    let str = vm.S.pop()
    // Type verification: ensure that k is a number and str is a string.
    if (typeof k !== 'number' || typeof str !== 'string') {
      throw new Error('Invalid types: expected a number for k and a string to operate on.')
    }
    if (str[0] === '"' && str[str.length - 1] === '"') {
      // Remove the quotes by slicing the string (removes first and last character).
      str = str.slice(1, -1)
    }

    // Check that 'k' does not exceed the length of the string.
    if (k > str.length) {
      vm.S.push(null)
      return
      // throw new Error(`Cannot take ${k} characters, string length is only ${str.length}.`);
    }

    const result = str[k]
    vm.S.push(result)
  }
}

/**
 * Represents a string manipulation instruction that removes a specified number of characters from the start of a string.
 */
export class SrkInstruction extends Instruction {
  /**
   * Executes the srk instruction by popping the number of characters to remove and the string from the stack.
   *
   * @param {Object} vm - The virtual machine instance.
   * @throws {Error} Throws an error if the types of k or str are invalid.
   */
  execute (vm) {
    // Pop 'k' from the stack, which indicates the number of characters to remove.
    const k = vm.S.pop()
    const str = vm.S.pop()
    // Type verification: ensure that k is a number and str is a string.
    if (typeof k !== 'number' || typeof str !== 'string') {
      throw new Error('Invalid types: expected a number for k and a string to operate on.')
    }
    // Check that 'k' does not exceed the length of the string.
    if (k > str.length) {
      throw new Error(`Cannot remove ${k} characters, string length is only ${str.length}.`)
    }
    // Remove the first 'k' characters from the string.
    const result = str.slice(k) // Get the substring starting from index k
    // Push the resulting substring back onto the stack.
    vm.S.push(result)
  }
}

/**
 * Represents a string manipulation instruction that concatenates two strings.
 */
export class CatInstruction extends Instruction {
  /**
   * Executes the cat instruction by popping two strings from the stack and concatenating them.
   *
   * @param {Object} vm - The virtual machine instance.
   * @throws {Error} Throws an error if the types of the operands are invalid.
   */
  execute (vm) {
    let str2 = vm.S.pop()
    let str1 = vm.S.pop()
    // Type verification: ensure that both operands are strings.
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
      throw new Error('Invalid types: expected two strings to concatenate.')
    }

    // Remove quotes if they exist
    if (str1[0] === '"' && str1[str1.length - 1] === '"') {
      str1 = str1.slice(1, -1)
    }

    if (str2[0] === '"' && str2[str2.length - 1] === '"') {
      str2 = str2.slice(1, -1)
    }

    // console.log(`Concatenating ${str1} and ${str2}`)

    vm.S.push(str1 + str2)
  }
}

/**
 * Represents an instruction that converts a value to a string.
 */
export class TosInstruction extends Instruction {
  /**
   * Executes the tos instruction by converting the top value from the stack to a string and pushing it back onto the stack.
   *
   * @param {Object} vm - The virtual machine instance.
   */
  execute (vm) {
    const value = vm.S.pop()
    vm.S.push(value.toString())
  }
}
