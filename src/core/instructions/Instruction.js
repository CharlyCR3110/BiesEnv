/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * Represents a single instruction in the virtual machine (VM).
 * This class serves as a base for all instruction types and
 * allows for the execution of various operations in the VM.
 * @class Instruction
 * @property {Array<any>} args - An array of arguments passed to the instruction.
 */

export class Instruction {
  /**
   * Creates an instance of the Instruction class.
   *
   * @param {...any} args - The arguments for the instruction.
   */
  constructor (...args) {
    this.args = args
  }

  /**
   * Executes the instruction within the context of the given virtual machine.
   * This method should be implemented in subclasses for specific instruction behavior.
   *
   * @param {VM} vm - The virtual machine instance in which to execute the instruction.
   * @throws {Error} If the method is not implemented in the derived class.
   */
  execute (vm) {
    // This would be implemented for each instruction type
    throw new Error('Not implemented')
  }
}
