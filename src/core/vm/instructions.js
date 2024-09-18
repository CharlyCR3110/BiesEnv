/**
 * Instruction handlers, this is where the actual work is done. Each handler is responsible for executing a specific instruction. The logic is kept separate from the VM class to keep the code clean and maintainable.
 * @module core/vm/instructions
 */

const handlePush = (vm, instruction) => {
  vm.stack.push(instruction.value)
}

const handlePop = (vm) => {
  vm.stack.pop()
}

const handleAdd = (vm) => {
  const a = vm.stack.pop()
  const b = vm.stack.pop()
  vm.stack.push(a + b)
}

const handleSubtract = (vm) => {
  const x = vm.stack.pop()
  const y = vm.stack.pop()
  vm.stack.push(x - y)
}

const handleMultiply = (vm) => {
  const m = vm.stack.pop()
  const n = vm.stack.pop()
  vm.stack.push(m * n)
}

const handleDivide = (vm) => {
  const a = vm.stack.pop()
  const b = vm.stack.pop()
  vm.stack.push(a / b)
}

const handleSet = (vm, instruction) => {
  vm.context.set(instruction.key, instruction.value)
}

const handleGet = (vm, instruction) => {
  vm.stack.push(vm.context.get(instruction.key))
}

const handlePrint = (vm) => {
  console.log(vm.stack.pop())
}

const handleEndOfProgram = (vm) => {
  console.log('End of program')
}

const handleUnknown = (vm, instruction) => {
  console.error(`Unknown instruction: ${instruction.op}`)
}

export const instructionHandlers = {
  push: handlePush,
  pop: handlePop,
  add: handleAdd,
  subtract: handleSubtract,
  multiply: handleMultiply,
  divide: handleDivide,
  set: handleSet,
  get: handleGet,
  prn: handlePrint,
  ldv: handlePush,
  bst: handleSet,
  mul: handleMultiply,
  div: handleDivide,
  ret: handlePop,
  hlt: handleEndOfProgram,
  default: handleUnknown
}
