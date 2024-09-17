import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class PrintVisitor extends BiesASMVisitor {
  visitProgram (ctx) {
    return this.visitChildren(ctx)
  }

  visitInstruction (ctx) {
    console.log('Instruction:', ctx.getText())
    return this.visitChildren(ctx)
  }

  visitDirective (ctx) {
    console.log('Directive:', ctx.getText())
    return this.visitChildren(ctx)
  }

  visitExpression (ctx) {
    console.log('Expression:', ctx.getText())
    return this.visitChildren(ctx)
  }
}
