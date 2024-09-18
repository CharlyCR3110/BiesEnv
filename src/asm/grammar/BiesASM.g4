grammar BiesASM;

// Programa que puede tener instrucciones, directivas o comentarios
program: (instruction | directive | BLOCK_COMMENT)* EOF;

// Instrucciones con su respectiva validación de argumentos
instruction
    : POP
    | BLD expression ',' expression
    | BST expression
    | LDC expression
    | LDV expression
    | ADD
    | MUL
    | DIV
    | SUB
    | PRN
    | RET
    | HLT
    ;

// Directivas como $FUN (aún no modificadas)
directive: '$FUN' IDENTIFIER (expression)* '$END';

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

// Identificador para nombres de funciones o variables
IDENTIFIER: [a-zA-Z_][a-zA-Z_0-9]*;

// Expresiones numéricas
expression: INT;

// Definición de números enteros
INT: [0-9]+;

// Espacios en blanco (ignorar)
WS: [ \t\r\n]+ -> skip;