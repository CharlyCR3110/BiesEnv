import { VM } from './vm/Vm.js'

const program = [
  { op: 'ldv', args: [5] },
  { op: 'ldv', args: [3] },
  { op: 'add' },
  { op: 'prn' },
  { op: 'hlt' }
]

const vm = new VM()
vm.loadProgram(program)
vm.run()
