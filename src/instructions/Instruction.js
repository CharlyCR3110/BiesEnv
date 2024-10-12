export class Instruction {
  constructor (...args) {
    this.args = args
  }

  execute (vm) {
    throw new Error('Not implemented')
  }
}
