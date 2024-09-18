import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class PrintVisitor extends BiesASMVisitor {
  visitProgram (ctx) {
    console.log('Program start')
    this.visitChildren(ctx)
    console.log('Program end')
    return null
  }

  visitInstruction (ctx) {
    const mnemonic = ctx.children[0].getText()
    console.log('Instruction:', mnemonic)

    // Obtener los argumentos según la instrucción
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

  visitFunctionDefinition (ctx) {
    console.log('Function Definition:')

    // Verifica los nombres de las funciones y si se pueden obtener
    const nameNode = ctx.IDENTIFIER()
    if (nameNode) {
      console.log('Name:', nameNode[0].getText())
    } else {
      console.log('Function name not found')
    }

    // Verifica los argumentos
    const argsNode = ctx.INT(0)
    if (argsNode) {
      console.log('Args:', argsNode.getText())
    } else {
      console.log('Args not found')
    }

    // Verifica el identificador del padre
    const parentNode = ctx.IDENTIFIER(1)
    if (parentNode) {
      console.log('Parent:', parentNode.getText())
    } else {
      console.log('Parent not found')
    }

    this.visitChildren(ctx)
    return null
  }

  visitBlock (ctx) {
    console.log('Block start')
    this.visitChildren(ctx)
    console.log('Block end')
    return null
  }

  // Método para visitar comentarios
  visitBLOCK_COMMENT (ctx) {
    console.log('Comment:', ctx.getText().slice(1).trim())
    return null
  }
}
