import fs from 'fs'
import { parse } from '../asm/biesParser.js'
import InstructionBuilderVisitor from '../asm/InstructionBuilderVisitor.js'

/**
 * Loader for loading and preparing code for the virtual machine.
 * @module interpreter/loader
 */

/**
 * Loads a source code file and converts it into an executable format.
 * @param {string} filePath - Path to the source code file.
 * @returns {Array} - List of instructions to execute.
 * @throws {Error} - If there is a problem reading or processing the file.
 */
export const loadCode = (filePath) => {
  try {
    // Read the source code file
    const code = fs.readFileSync(filePath, 'utf8')

    // Parse the source code into an AST
    const tree = parse(code)

    return linkCode(tree)
  } catch (error) {
    throw new Error(`Error loading code: ${error.message}`)
  }
}

/**
 * Links the code by converting the AST into a list of instructions.
 * @param {ProgramContext} tree
 * @returns {Array} - List of instructions to execute.
 * @throws {Error} - If there is a problem linking the code.
 * @see {@link InstructionBuilderVisitor}
 * @example
 * const instructions = linkCode(tree)
 */
const linkCode = (tree) => {
  // Create a new instance of the instruction builder visitor
  const visitor = new InstructionBuilderVisitor()

  // Visit the tree to build the instructions
  const instructions = visitor.visit(tree)

  return instructions
}
