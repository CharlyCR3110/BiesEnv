import antlr4 from 'antlr4'
import BiesASMLexer from './grammar/.antlr/biesASMLexer.js'
import BiesASMParser from './grammar/.antlr/biesASMParser.js'
import { MyErrorListener } from '../errors/MyErrorListener.js'

function parse (input) {
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

export default parse
