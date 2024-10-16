/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita 
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

export class Instruction {
  constructor (...args) {
    this.args = args
  }

  execute (vm) {
    // This would be implemented for each instruction type
    throw new Error('Not implemented')
  }
}
