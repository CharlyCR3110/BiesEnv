import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class PrintVisitor extends BiesASMVisitor {
  visitProgram (ctx) {
    console.log('Program start')
    this.visitChildren(ctx)
    console.log('Program end')
    return null
  }

  visitInstruction (ctx) {
    // La primera parte del contexto debería ser el mnemonico de la instrucción
    const mnemonic = ctx.children[0].getText()
    console.log('Instruction:', mnemonic)

    // Obtener los argumentos como texto directamente desde los hijos del contexto
    const args = ctx.children.slice(1).map(child => child.getText())
    if (args.length > 0) {
      console.log('Arguments:', args.join(', '))
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
    if (nameNode && nameNode.length > 0) {
      console.log('Name:', nameNode[0].getText())
    } else {
      console.log('Function name not found')
    }

    // Verifica los argumentos
    const argsNodes = ctx.NUMBER()
    if (argsNodes.length > 0) {
      const args = argsNodes.map(arg => arg.getText()).join(', ')
      console.log('Args:', args)
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

  visitBLOCK_COMMENT (ctx) {
    console.log('Comment:', ctx.getText().slice(1).trim())
    return null
  }
}
