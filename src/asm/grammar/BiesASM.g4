grammar BiesASM;

// Programa que puede tener instrucciones, directivas o comentarios
program: (instruction | directive | BLOCK_COMMENT)* EOF;

// Instrucciones con su respectiva validación de argumentos
instruction
    : POP
    | BLD expression expression
    | BST expression expression
    | LDC expression
    | LDV expression
    | ADD
    | MUL
    | DIV
    | SUB
    | PRN
    | RET
    | HLT
    | LDF expression
    | APP
    ;

// Directivas, incluyendo la definición de funciones ($FUN)
directive: functionDefinition;

// Definición de una función con un cuerpo de instrucciones
functionDefinition
    : '$FUN' IDENTIFIER 'args:' INT 'parent:' IDENTIFIER block '$END' 
    ;

// Bloque de instrucciones dentro de una función
block
    : (instruction | BLOCK_COMMENT)*  // Instrucciones válidas dentro de una función
    ;

// Comentarios, empiezan con ; y terminan con un salto de línea o fin de archivo
BLOCK_COMMENT   : ';' .*? '\n' -> skip;

// Definiciones de las instrucciones básicas (mnemónicos)
POP: 'POP'; 
BLD: 'BLD';
BST: 'BST';
LDC: 'LDC';
LDV: 'LDV';
ADD: 'ADD';
MUL: 'MUL';
DIV: 'DIV';
SUB: 'SUB';
PRN: 'PRN';
RET: 'RET';
HLT: 'HLT';
LDF: 'LDF';  // Instrucción para cargar una función
APP: 'APP';  // Instrucción para aplicar una función

// Identificador para nombres de funciones o variables
IDENTIFIER: [$a-zA-Z_][a-zA-Z_0-9]*;

// Expresiones numéricas
expression: INT | IDENTIFIER;

// Definición de números enteros
INT: [0-9]+;

// Espacios en blanco (ignorar)
WS: [ \t\r\n]+ -> skip;
