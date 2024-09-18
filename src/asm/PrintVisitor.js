import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class PrintVisitor extends BiesASMVisitor {
  visitProgram (ctx) {
    return this.visitChildren(ctx)
  }

  visitInstruction (ctx) {
    const mnemonic = ctx.children[0].getText()
    console.log('Instruction:', mnemonic)

    const args = ctx.expression()
    if (args.length > 0) {
      const argText = args.map(arg => arg.getText()).join(', ')
      console.log('Arguments:', argText)
    }

    return this.visitChildren(ctx)
  }

  visitDirective (ctx) {
    console.log('Directive:', ctx.getText())
    return this.visitChildren(ctx)
  }
}
