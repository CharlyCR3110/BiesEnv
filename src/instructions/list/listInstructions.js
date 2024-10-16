import { Instruction } from '../Instruction.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */

/**
 * Represents an instruction to check if a list is empty or null.
 * @class
 * @extends Instruction
 * @classdesc The LntInstruction class implements the execution of checking
 * whether the top value on the stack is either null, undefined, or an empty array.
 */
export class LntInstruction extends Instruction {
  /**
   * Executes the instruction, checking the top value on the stack.
   * @param {object} vm - The virtual machine instance.
   * @memberof LntInstruction
   */
  execute (vm) {
    const list = vm.S.pop()
    vm.S.push(!!(list === null || (list instanceof Array && list.length === 0) || list === undefined))
  }
}

/**
 * Represents an instruction to add a value to a list.
 * @class
 * @extends Instruction
 * @classdesc The LinInstruction class implements the execution of inserting a value
 * at the beginning of a list or creating a new list if the top value is not an array.
 */
export class LinInstruction extends Instruction {
  /**
   * Executes the instruction, adding a value to a list.
   * @param {object} vm - The virtual machine instance.
   * @memberof LinInstruction
   */
  execute (vm) {
    const list = vm.S.pop()
    const value = vm.S.pop()
    list instanceof Array
      ? list.unshift(value)
      : vm.S.push([value])

    vm.S.push(list)
  }
}

/**
 * Represents an instruction to retrieve an element from a list by index.
 * @class
 * @extends Instruction
 * @classdesc The LtkInstruction class implements the execution of retrieving
 * a value from a list based on the index provided by the top value on the stack.
 */
export class LtkInstruction extends Instruction {
  /**
   * Executes the instruction, retrieving an element from a list.
   * @param {object} vm - The virtual machine instance.
   * @memberof LtkInstruction
   */
  execute (vm) {
    const k = vm.S.pop()
    const list = vm.S.pop()
    console.log(list)

    console.log(list[k])
    vm.S.push(list[k])
  }
}

/**
 * Represents an instruction to slice a list starting from a given index.
 * @class
 * @extends Instruction
 * @classdesc The LrkInstruction class implements the execution of creating
 * a new list that contains elements from a specified index to the end of the list.
 */
export class LrkInstruction extends Instruction {
  /**
   * Executes the instruction, slicing a list from an index.
   * @param {object} vm - The virtual machine instance.
   * @memberof LrkInstruction
   */
  execute (vm) {
    const k = vm.S.pop()
    const list = vm.S.pop()
    vm.S.push(list.slice(k))
  }
}

/**
 * Represents an instruction to convert a single value to a list.
 * @class
 * @extends Instruction
 * @classdesc The TolInstruction class implements the execution of wrapping
 * a single value in an array, effectively converting it into a list.
 */
export class TolInstruction extends Instruction {
  /**
   * Executes the instruction, converting a value to a list.
   * @param {object} vm - The virtual machine instance.
   * @memberof TolInstruction
   */
  execute (vm) {
    const value = vm.S.pop()
    // parse value to list - e.g 4 -> [4]
    vm.S.push([value])
  }
}
