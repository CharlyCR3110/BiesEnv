import antlr4 from 'antlr4'
import BiesASMLexer from './grammar/.antlr/biesASMLexer.js'
import BiesASMParser from './grammar/.antlr/biesASMParser.js'
import { MyErrorListener } from '../errors/MyErrorListener.js'

/**
 * Parses the input code.
 * @param {*} input
 * @returns {Tree}
 * @throws {Error} - If there is a problem parsing the code.
 * @module asm/biesParser
 * @example
 * import { parse } from './asm/biesParser.js'
 * const input = `
 * ; Esto es un ejemplo de código BIESVM
 * LDV 666
 * PRN
 * HLT
 * `
 * const tree = parse(input)
 */
export const parse = (input) => {
  const chars = new antlr4.InputStream(input)
  const lexer = new BiesASMLexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)

  const parser = new BiesASMParser(tokens)

  // listen for errors
  parser.removeErrorListeners()
  parser.addErrorListener(new MyErrorListener())

  const tree = parser.program()

  return tree
}
