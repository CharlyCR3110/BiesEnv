# biesVM - A Simple Stack-Based Virtual Machine

## Introduction

`biesVM` is a stack-based virtual machine developed for academic purposes. It executes assembly code (`biesASM`) generated for the toy language `bies`. The project aims to develop both a virtual machine (`biesVM`) and a compiler (`biesC`) that produces code for the `biesVM`.

In this repository, you'll find the implementation of `biesVM`, the virtual machine interpreter. Future updates will include the `biesC` compiler as a second phase of the project.

## Features

- **Stack-based computation**: `biesVM` is a stack machine, where computations are performed using a stack (`S`).
- **Function handling**: Support for function calls, closures, and environments (`B`).
- **Execution context management**: Tracks function calls and returns using a stack of execution contexts (`D`).
- **Common operations**: Arithmetic, logic, string manipulation, and list operations.

## Prerequisites

This project requires the following tools:

- [Node.js](https://nodejs.org/) (ES6+)
- [ANTLR4](https://www.antlr.org/) for parsing `biesASM`
- A terminal to execute commands

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CharlyCR3110/BiesEnv.git
   cd biesVM
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the antlr4:

   ```bash
   npm run antlr
   ```

## Usage

To execute an assembly file (`.basm`), use the following command:

```bash
node src/main.js --o output.txt --e error.txt --trace {0 | 1} <file.basm>
```

*The `--o` and `--e` flags are optional and specify the output and error files, respectively. The `--trace` flag enables or disables the trace mode, which prints the stack and execution context at each step.*

*<file.basm> is the path to the assembly file to execute. This file
contains the instructions to be executed by the virtual machine. Its also important to take in mid that the path is relative to the src folder.*

### Example

```bash
node src/main.js --o output.txt --e error.txt --trace 1 examples/01.basm
```

This will run the `.basm` file on the virtual machine and print the results to the console.

### Example of a `.basm` File

```bash
; Definición del entorno principal
$FUN $0 args:2 parent: $0   ; Entorno $0 con 2 argumentos: 'a' y 'b'

; Inicialización de variables
LDV 1                      ; Cargar valor 1 (a) en la pila
BST 0 0                    ; Guardar 'a' en la posición 0 del entorno
LDV 656                    ; Cargar valor 656 (b) en la pila
BST 0 1                    ; Guardar 'b' en la posición 1 del entorno

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
BLD 0 0
PRN                        ; Imprimir el valor pasado a la función (saludo)
RET                        ; Retornar después de imprimir
$END
```

### Instructions

The following are a few of the supported instructions for `biesVM`:

- **Arithmetic**: `ADD`, `SUB`, `MUL`, `DIV`
- **Logic**: `AND`, `OR`, `NOT`
- **Stack operations**: `POP`, `SWP`
- **Function calls**: `APP`, `RET`
- **List operations**: `LIN`, `LTK`, `LRK`

### Authors
- Carlos González Garita
- Felipe Brenes Calderón
- Raquel Alfaro Barrantes
- Samuel Alfaro Rodríguez