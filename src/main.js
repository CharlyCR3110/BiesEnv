import { VM } from './core/vm/Vm.js'

const vm = new VM()

vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }])

console.log(vm.stack.pop()) // 15
