export class Instruction {
  constructor (...args) {
    this.args = args
  }

  execute (vm) {
    // This would be implemented for each instruction type
    throw new Error('Not implemented')
  }
}
