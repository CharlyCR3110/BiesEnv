import { VM } from './core/vm/Vm.js'

const input = `
; Esto es un ejemplo de código BIESVM
LDV 666
PRN
HLT
`

const input2 = `
; Esto es un ejemplo de código BIESVM
LDV 666 ; Cargar valor 666 en la pila
BST 0 0
BLD 0 0
PRN
HLT
`

const input3 = `
; Esto es un ejemplo de código BIESVM
LDV 1
BST 0 0
LDV 665
BST 0 1
BLD 0 0
BLD 0 1
ADD
PRN
HLT
`

const vm = new VM()
vm.executeParsedCode(input3)
