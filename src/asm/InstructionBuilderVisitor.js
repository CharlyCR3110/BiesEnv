import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

export default class InstructionBuilderVisitor extends BiesASMVisitor {
  constructor () {
    super()
    this.instructions = []
    this.functions = {}
  }

  visitProgram (ctx) {
    // Visita todos los nodos hijos del contexto del programa
    this.visitChildren(ctx)
    return [this.instructions, this.functions]
  }

  visitInstruction (ctx) {
    // Obtiene el mnemónico de la instrucción
    const mnemonic = ctx.children[0].getText().toLowerCase()

    // Obtiene los argumentos, si los hay, a partir del contexto
    const args = ctx.children.slice(1).map(child => {
      if (child.getText() === 'BLD' || child.getText() === 'BST' || child.getText() === 'LDF') {
        return {
          type: 'expression',
          value: child.getText()
        }
      } else {
        return {
          type: 'constant',
          value: child.getText()
        }
      }
    })

    // Agrega la instrucción a la lista de instrucciones
    this.instructions.push({ op: mnemonic, args })

    return this.visitChildren(ctx)
  }

  visitDirective (ctx) {
    // Maneja las directivas como la definición de funciones
    // Aquí, solo mostramos un mensaje pero puedes agregar lógica adicional si es necesario
    return this.visitChildren(ctx)
  }

  visitFunctionDefinition (ctx) {
    // Extrae el nombre de la función
    const nameNode = ctx.IDENTIFIER(0)
    const name = nameNode ? nameNode.getText() : 'unknown'

    // numero de argumentos
    const argCount = parseInt(ctx.INT().getText(), 10)

    // parent context
    const parentNode = ctx.IDENTIFIER(1)
    const parentName = parentNode ? parentNode.getText() : 'unknown'

    // Extrae el bloque de instrucciones de la función
    const block = ctx.block()
    const instructions = []
    if (block) {
      // Crea un nuevo visitante para el bloque de instrucciones
      const blockVisitor = new InstructionBuilderVisitor()
      blockVisitor.visit(block)
      instructions.push(...blockVisitor.instructions)
    }

    // Almacena la definición de la función
    this.functions[name] = { argCount, parentName, instructions }

    return this.visitChildren(ctx)
  }

  visitBlock (ctx) {
    // Procesa los bloques de instrucciones dentro de las funciones
    this.visitChildren(ctx)
    return null
  }

  // Método para manejar comentarios de bloques
  visitBLOCK_COMMENT (ctx) {
    // Los comentarios se ignoran por defecto, pero puedes registrar o manejar como desees
    console.log(`Comment: ${ctx.getText().slice(1).trim()}`)
    return null
  }
}
