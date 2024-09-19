import { VM } from './core/vm/Vm.js'

// print(666)
const input1 = `
; Esto es un ejemplo de código BIESVM
LDV 666
PRN
HLT
`

// const holamundo = 666
// print(holamundo)
const input2 = `
; Esto es un ejemplo de código BIESVM
LDV 666 ; Cargar valor 666 en la pila
BST 0 0
BLD 0 0
PRN
HLT
`

// const a = 1
// const b = 665
// print(a + b)
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
console.log('Input 1:')
vm.executeParsedCode(input1)

console.log('Input 2:')
vm.executeParsedCode(input2)

console.log('Input 3:')
vm.executeParsedCode(input3)
