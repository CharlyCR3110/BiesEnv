/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

/**
 * Represents a base class for instructions in the virtual machine.
 * This class serves as a template for all specific instruction implementations.
 */
export class Instruction {
  /**
   * Creates an instance of the Instruction class.
   *
   * @param {...*} args - The arguments to be passed to the instruction.
   */
  constructor (...args) {
    this.args = args
  }

  /**
   * Executes the instruction within the context of the provided virtual machine.
   * This method must be implemented by subclasses.
   *
   * @param {Object} vm - The virtual machine instance in which the instruction is executed.
   * @throws {Error} Throws an error if the method is not implemented in the subclass.
   */
  execute (vm) {
    throw new Error('Not implemented')
  }
}
