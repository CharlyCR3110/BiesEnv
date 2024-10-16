import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

/**
 * A visitor class that prints the structure of the BIESVM assembly program.
 *
 * This class extends the BiesASMVisitor to traverse the parse tree
 * and print the details of programs, instructions, directives,
 * function definitions, blocks, and comments to the console.
 *
 * @class PrintVisitor
 * @extends BiesASMVisitor
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */
export default class PrintVisitor extends BiesASMVisitor {
  /**
   * Visits the program node and logs the program start and end.
   *
   * @param {Object} ctx - The context of the program node.
   * @returns {null} - Returns null after processing.
   */
  visitProgram (ctx) {
    console.log('Program start')
    this.visitChildren(ctx)
    console.log('Program end')
    return null
  }

  /**
   * Visits an instruction node and logs the mnemonic and its arguments.
   *
   * @param {Object} ctx - The context of the instruction node.
   * @returns {null} - Returns null after processing.
   */
  visitInstruction (ctx) {
    // The first part of the context should be the mnemonic of the instruction
    const mnemonic = ctx.children[0].getText()
    console.log('Instruction:', mnemonic)

    // Obtain the arguments as text directly from the context's children
    const args = ctx.children.slice(1).map(child => child.getText())
    if (args.length > 0) {
      console.log('Arguments:', args.join(', '))
    }

    return this.visitChildren(ctx)
  }

  /**
   * Visits a directive node and logs its text.
   *
   * @param {Object} ctx - The context of the directive node.
   * @returns {null} - Returns null after processing.
   */
  visitDirective (ctx) {
    console.log('Directive:', ctx.getText())
    return this.visitChildren(ctx)
  }

  /**
   * Visits a function definition node and logs its name, arguments, and parent.
   *
   * @param {Object} ctx - The context of the function definition node.
   * @returns {null} - Returns null after processing.
   */
  visitFunctionDefinition (ctx) {
    console.log('Function Definition:')

    // Checks the function names and if they can be obtained
    const nameNode = ctx.IDENTIFIER()
    if (nameNode && nameNode.length > 0) {
      console.log('Name:', nameNode[0].getText())
    } else {
      console.log('Function name not found')
    }

    // Checks the arguments
    const argsNodes = ctx.NUMBER()
    if (argsNodes.length > 0) {
      const args = argsNodes.map(arg => arg.getText()).join(', ')
      console.log('Args:', args)
    } else {
      console.log('Args not found')
    }

    // Checks the identifier of the parent
    const parentNode = ctx.IDENTIFIER(1)
    if (parentNode) {
      console.log('Parent:', parentNode.getText())
    } else {
      console.log('Parent not found')
    }

    this.visitChildren(ctx)
    return null
  }

  /**
   * Visits a block node and logs the block start and end.
   *
   * @param {Object} ctx - The context of the block node.
   * @returns {null} - Returns null after processing.
   */
  visitBlock (ctx) {
    console.log('Block start')
    this.visitChildren(ctx)
    console.log('Block end')
    return null
  }

  /**
   * Visits a block comment node and logs its content.
   *
   * @param {Object} ctx - The context of the block comment node.
   * @returns {null} - Returns null after processing.
   */
  visitBLOCK_COMMENT (ctx) {
    console.log('Comment:', ctx.getText().slice(1).trim())
    return null
  }
}
