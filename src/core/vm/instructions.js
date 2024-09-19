/**
 * Instruction handlers, this is where the actual work is done. Each handler is responsible for executing a specific instruction. The logic is kept separate from the VM class to keep the code clean and maintainable.
 * @module core/vm/instructions
 */

const handlePush = (vm, instruction) => {
  vm.stack.push(instruction.args[0].value)
}

const handlePop = (vm) => {
  vm.stack.pop()
}

const handleAdd = (vm) => {
  const a = parseInt(vm.stack.pop())
  const b = parseInt(vm.stack.pop())
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
  vm.context.set(instruction.key, instruction.args[0].value)
}

const handleGet = (vm, instruction) => {
  vm.stack.push(vm.context.get(instruction.key))
}

const handlePrint = (vm) => {
  console.log(vm.stack.pop())
}

const handleBst = (vm, instruction) => {
  const value = vm.stack.pop()
  const contextIndex = instruction.args[0].value // índice del contexto
  const variableIndex = instruction.args[1].value // índice de la variable

  // Acceder al contexto correcto
  let context = vm.contexts.peek()
  for (let i = 0; i < contextIndex; i++) {
    context = context.parent
  }
  context[variableIndex] = value
}

const handleBld = (vm, instruction) => {
  const contextIndex = instruction.args[0].value // índice del contexto
  const variableIndex = instruction.args[1].value // índice de la variable

  // Acceder al contexto correcto
  let context = vm.contexts.peek()
  for (let i = 0; i < contextIndex; i++) {
    context = context.parent
  }
  vm.stack.push(context[variableIndex])
}

const handleEndOfProgram = (vm) => {
  console.log('End of program')
}

const handleUnknown = (vm, instruction) => {
  console.error(`Unknown instruction: ${instruction.op}`)
}

export const instructionHandlers = {
  pop: handlePop,
  bst: handleBst,
  bld: handleBld,
  add: handleAdd,
  prn: handlePrint,
  ldv: handlePush,
  mul: handleMultiply,
  div: handleDivide,
  ret: handlePop,
  hlt: handleEndOfProgram,
  default: handleUnknown
}
