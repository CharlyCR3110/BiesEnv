export class Instruction {
  constructor (mnemonic, ...args) {
    this.mnemonic = mnemonic
    this.args = args
  }

  execute (vm) {
    // This would be implemented for each instruction type
    throw new Error('Not implemented')
  }
}
