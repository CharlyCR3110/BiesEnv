import antlr4 from 'antlr4'
import BiesASMLexer from './asm/grammar/.antlr/biesASMLexer.js'
import BiesASMParser from './asm/grammar/.antlr/biesASMParser.js'
import InstructionBuilderVisitor from './asm/InstructionBuilderVisitor.js'
import PrintVisitor from './asm/PrintVisitor.js'
import { VM } from './core/vm/Vm.js'

const input = `
; Esto es un ejemplo de código BIESVM
LDV 666
PRN
HLT
`

const chars = new antlr4.InputStream(input)
const lexer = new BiesASMLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)

const parser = new BiesASMParser(tokens)
const tree = parser.program()

const visitor = new InstructionBuilderVisitor()
const instructions = visitor.visit(tree)

const vm = new VM()
vm.execute(instructions)
