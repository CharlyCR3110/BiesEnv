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
    throw new Error('Not implemented')
  }
}
