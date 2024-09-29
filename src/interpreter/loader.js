import fs from 'fs'
import { parse } from '../asm/biesParser.js'
import InstructionBuilderVisitor from '../asm/InstructionBuilderVisitor.js'
import { VM } from '../vm/Vm.js'
import { createInstruction } from '../vm/factories/InstructionFactory.js'
import { FunctionClosure } from '../core/bindings/FunctionClosure.js'

/**
 * Loader for loading and preparing code for the virtual machine.
 * @module interpreter/loader
 */

/**
 * Loads a source code file and converts it into an executable format.
 * @param {string} filePath - Path to the source code file.
 * @returns {Object} - Object containing the VM instance and the main program instructions.
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
 * Links the code by converting the AST into a list of instructions and setting up the VM.
 * @param {ProgramContext} tree
 * @returns {Object} - Object containing the VM instance and the main program instructions.
 * @throws {Error} - If there is a problem linking the code.
 * @see {@link InstructionBuilderVisitor}
 * @example
 * const { vm, mainInstructions } = linkCode(tree);
 */
const linkCode = (tree) => {
  const visitor = new InstructionBuilderVisitor()
  const [rawInstructions, rawFunctions] = visitor.visit(tree)

  const vm = new VM()

  // Convert raw instructions to Instruction objects
  const convertInstructions = (instr) =>
    instr.map(i => createInstruction(i.op, ...i.args))

  // Process functions
  for (const [name, func] of Object.entries(rawFunctions)) {
    const functionInstructions = convertInstructions(func.instructions)
    const closure = new FunctionClosure(
      func.params,
      functionInstructions,
      vm.B.frames.peek()
    )
    vm.defineFunction(name, closure)
  }

  // Convert main program instructions
  const mainInstructions = convertInstructions(rawInstructions)

  return { vm, mainInstructions }
}

/**
 * Loads and runs a biesVM program.
 * @param {string} filePath - Path to the source code file.
 */
export const loadAndRun = (filePath) => {
  const { vm, mainInstructions } = loadCode(filePath)
  vm.loadProgram(mainInstructions)
  vm.run()
}
