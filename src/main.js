import { VM } from './core/vm/Vm.js'

import { loadCode } from './interpreter/loader.js'

const vm = new VM()
console.log('Input 1:')
const tree1 = loadCode('examples/01.basm')
vm.executeParsedCode(tree1)

console.log('Input 2:')
const tree2 = loadCode('examples/02.basm')
vm.executeParsedCode(tree2)

console.log('Input 3:')
const tree3 = loadCode('examples/03.basm')
vm.executeParsedCode(tree3)

console.log('Input 4:')
const tree = loadCode('examples/01.basm')
vm.executeParsedCode(tree)
