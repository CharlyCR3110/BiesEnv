import { VM } from './core/vm/Vm.js'

import parse from './asm/biesParser.js'

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

// let x = 1
// let foo = x => y => x + y
// print(foo(3)(4))
// ; $0 es main
// ; $1 es x => $2
// ; $2 es y => x + y
// ;
// $fun $0 args:0 parent:$0
// ; x es 0 0
// ; foo es 0 1
// ldv 1
// bst 0 0 ; let x = 1
// ldf $1 ;crea clausura de $1 (denotamos como [$1]) y pone en pila
// bst 0 1 ; foo = [$1]
// ldv 4
// ldv 3
// bld 0 1 ; [$1] en pila
// app     ; $1(3). Cuando retorne habrá una clausura [$2]
// app     ; $2(4)
// prn     ; print(3+4)
// halt    ; el compilador añade un hlt al final del main
// $end
// ;
// $fun $1 args:1 parent:$0
// ; x es 0 0
// ldf $2 ; crea clausura [$2] y pone en pila
// ret
// $end
// ;
// $fun $2 args:1 parent:$1
// ; y es 0 0
// bld 1 0 ; carga x de $1 en pila
// bld 0 0 ; carga y local  en pila
// add
// ret ; retorna x + y
// $end

// const salude = saludo => print(saludo)
// const a = 1
// const b = 656
// salude(a * 10 + b)

const input4 = `
; Definición del entorno principal
$FUN $0 args:2 parent: $0   ; Entorno $0 con 2 argumentos: 'a' y 'b'

; Inicialización de variables
LDV 1                      ; Cargar valor 1 (a) en la pila
BST 0 0                    ; Guardar 'a' en la posición 0 del entorno
LDV 656                    ; Cargar valor 656 (b) en la pila
BST 0 1                    ; Guardar 'b' en la posición 1 del entorno
HLT

; Operación aritmética a * 10 + b
BLD 0 0                    ; Cargar 'a' en la pila
LDV 10                     ; Cargar valor 10 en la pila
MUL                        ; Multiplicar a * 10
BLD 0 1                    ; Cargar 'b' en la pila
ADD                        ; Sumar el resultado anterior con 'b'

; Llamada a la función salude
LDF $1                     ; Cargar la función 'salude' (definida en $1)
APP                        ; Aplicar la función con el valor en la pila (a * 10 + b)

HLT
$END

; Definición de la función 'salude' que imprime el argumento
$FUN $1 args: 1 parent: $0
PRN                        ; Imprimir el valor pasado a la función (saludo)
RET                        ; Retornar después de imprimir
$END
`
const vm = new VM()
console.log('Input 1:')
const tree1 = parse(input1)
vm.executeParsedCode(tree1)

console.log('Input 2:')
const tree2 = parse(input2)
vm.executeParsedCode(tree2)

console.log('Input 3:')
const tree3 = parse(input3)
vm.executeParsedCode(tree3)
