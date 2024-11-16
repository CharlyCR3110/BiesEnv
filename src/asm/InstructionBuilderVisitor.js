import BiesASMVisitor from './grammar/.antlr/BiesASMVisitor.js'

/**
 * A visitor class that builds instructions from the BIESVM assembly program.
 *
 * This class extends the BiesASMVisitor to traverse the parse tree
 * and collect instructions and function definitions.
 *
 * @class InstructionBuilderVisitor
 * @extends BiesASMVisitor
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */
export default class InstructionBuilderVisitor extends BiesASMVisitor {
  constructor () {
    super()
    this.instructions = []
    this.functions = {}
  }
  
  /**
   * Visits the program node and processes all child nodes.
   *
   * @param {Object} ctx - The context of the program node.
   * @returns {Array.<Array.<Object>, Object>} - An array containing the list of instructions and function definitions.
   */
  visitProgram (ctx) {
    // Visits all child nodes of the program context
    this.visitChildren(ctx)
    return [this.instructions, this.functions]
  }

  /**
   * Visits an instruction node and extracts its mnemonic and arguments.
   *
   * @param {Object} ctx - The context of the instruction node.
   * @returns {null} - Returns null after processing.
   */
  visitInstruction (ctx) {
    // Obtains the mnemonic of the instruction
    const mnemonic = ctx.children[0].getText().toLowerCase()

    // Obtains the arguments, if any, from the context
    const args = ctx.children.slice(1).map(child => {
      return child.getText()
    })

    // Adds the instruction to the list of instructions
    this.instructions.push({ op: mnemonic, args })

    return this.visitChildren(ctx)
  }

  /**
   * Visits a directive node, currently handling function definitions.
   *
   * @param {Object} ctx - The context of the directive node.
   * @returns {null} - Returns null after processing.
   */
  visitDirective (ctx) {
    // Handles directives like function definitions
    // Here, just displays a message but additional logic can be added if needed
    return this.visitChildren(ctx)
  }

  /**
   * Visits a function definition node and extracts its details.
   *
   * @param {Object} ctx - The context of the function definition node.
   * @returns {null} - Returns null after processing.
   */
  visitFunctionDefinition (ctx) {
    // Extracts the function name
    const nameNode = ctx.IDENTIFIER(0)
    const name = nameNode ? nameNode.getText() : 'unknown'

    // Number of arguments
    const argCount = parseInt(ctx.NUMBER().getText(), 10)

    // Parent context
    const parentNode = ctx.IDENTIFIER(1)
    const parentName = parentNode ? parentNode.getText() : 'unknown'

    // Extracts the instruction block of the function
    const block = ctx.block()
    const instructions = []
    if (block) {
      // Creates a new visitor for the instruction block
      const blockVisitor = new InstructionBuilderVisitor()
      blockVisitor.visit(block)
      instructions.push(...blockVisitor.instructions)
    }

    // Stores the function definition
    this.functions[name] = { argCount, parentName, instructions }

    return this.visitChildren(ctx)
  }

  /**
   * Visits a block node and processes its child instructions.
   *
   * @param {Object} ctx - The context of the block node.
   * @returns {null} - Returns null after processing.
   */
  visitBlock (ctx) {
    // Processes instruction blocks within functions
    this.visitChildren(ctx)
    return null
  }

  /**
   * Method to handle block comments.
   *
   * Block comments are ignored by default, but can be logged or handled as desired.
   *
   * @param {Object} ctx - The context of the block comment node.
   * @returns {null} - Returns null after processing.
   */
  visitBLOCK_COMMENT (ctx) {
    // Comments are ignored by default, but you can log or handle as desired
    console.log(`Comment: ${ctx.getText().slice(1).trim()}`)
    return null
  }
  
}
