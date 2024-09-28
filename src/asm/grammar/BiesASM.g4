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
    | APP optionalExpression
    | STK expression
    | SRK expression
    | INP
    | BR expression
    | BT expression
    | BF expression
    | SWP
    | NEG
    | SGN
    | EQ
    | EQQ
    | GT
    | GTE
    | LT
    | LTE
    | AND
    | OR
    | XOR
    | NOT 
    | SNT
    | CAT expression
    | TOS
    | CST expression
    | INO expression
    ;

// Directivas, incluyendo la definición de funciones ($FUN)
directive: functionDefinition;

// Definición de una función con un cuerpo de instrucciones
functionDefinition
    : '$FUN' IDENTIFIER 'args:' NUMBER 'parent:' IDENTIFIER block '$END' 
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
STK: 'STK';  // Tomar el késimo
SRK: 'SRK';  // Tomar el resto
INP: 'INP';
BR : 'BR' ;  // B.pc+= N 
BT : 'BT' ;  // S.top() ?   B.pc+= N, S.pop()
BF : 'BF' ;  // !S.top() ?   B.pc+= N, S.pop()
SWP: 'SWP';  
NEG: 'NEG';
SGN: 'SGN';
EQ : 'EQ' ;
EQQ: 'EQQ';
GT : 'GT' ;
GTE: 'GTE';
LT : 'LT' ;
LTE: 'LTE';
AND: 'AND';
OR : 'OR' ;
XOR: 'XOR';
NOT: 'NOT';
SNT: 'SNT';  // string null test
CAT: 'CAT';  // Concatenar
TOS: 'TOS';  // Valor a String v.toString()
CST: 'CST';  //Casting
INO: 'INO';  // Instance of

// Identificador para nombres de funciones o variables
IDENTIFIER: [$a-zA-Z_][a-zA-Z_0-9]*;

// Expresiones numéricas
expression: NUMBER | STRING | IDENTIFIER;

optionalExpression: NUMBER?;

// Definición de números enteros, floats y en notacion cientifica
NUMBER: [0-9]+ ('.' [0-9]+)? ([eE] [+-]? [0-9]+)?;

//Definición de Strings
STRING: '"' (~["\\] | '\\' .)* '"';

// Espacios en blanco (ignorar)
WS: [ \t\r\n]+ -> skip;
