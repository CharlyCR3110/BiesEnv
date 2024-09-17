grammar biesASM;

program: (instruction | directive)* EOF;

instruction: POP | BLD | BST | LDC | ADD | MUL | DIV | SUB | PRN | RET | HLT;

POP: 'POP';
BLD: 'BLD';
BST: 'BST';
LDC: 'LDC';
ADD: 'ADD';
MUL: 'MUL';
DIV: 'DIV';
SUB: 'SUB';
PRN: 'PRN';
RET: 'RET';
HLT: 'HLT';

directive: '$FUN' IDENTIFIER (expression)* '$END';

IDENTIFIER: [a-zA-Z_][a-zA-Z_0-9]*;
expression: INT;

INT: [0-9]+;

WS: [ \t\r\n]+ -> skip;
