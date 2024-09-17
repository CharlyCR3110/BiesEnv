import antlr4 from 'antlr4'
import BiesASMLexer from './asm/grammar/.antlr/biesASMLexer.js'
import BiesASMParser from './asm/grammar/.antlr/biesASMParser.js'
import PrintVisitor from './asm/PrintVisitor.js'

const input = `
; Esto es un ejemplo de código BIESVM
POP
BLD 1, 2
BST 3
LDC 10
ADD
MUL
DIV
SUB
PRN 5
RET
HLT

$FUN miFuncion 1 2
; Una función de ejemplo
$END

`

const chars = new antlr4.InputStream(input)
const lexer = new BiesASMLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)

const parser = new BiesASMParser(tokens)
const tree = parser.program()

const visitor = new PrintVisitor()
visitor.visit(tree)
