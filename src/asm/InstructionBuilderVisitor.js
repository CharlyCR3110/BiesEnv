import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class InstructionBuilderVisitor extends BiesASMVisitor {
  constructor () {
    super()
    this.instructions = []
  }

  visitProgram (ctx) {
    this.visitChildren(ctx)
    return this.instructions
  }

  visitInstruction (ctx) {
    const mnemonic = ctx.children[0].getText()
    let args = ctx.expression()
    if (args.length > 0) {
      args = args.map(arg => ({ op: 'push', value: parseInt(arg.getText(), 10) }))
    }

    this.instructions.push({ op: mnemonic.toLowerCase(), value: parseInt(args[0]?.value, 10) })

    return this.visitChildren(ctx)
  }

  visitDirective (ctx) {
    // Puedes agregar lógica para manejar directivas si es necesario
    return this.visitChildren(ctx)
  }
}
