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
  const env = vm.environments.peek() // Get the current environment
  env.setVariable(instruction.key, instruction.args[0].value)
}

const handleGet = (vm, instruction) => {
  const env = vm.environments.peek() // Get the current environment
  vm.stack.push(env.getVariable(instruction.key))
}

const handlePrint = (vm) => {
  console.log(vm.stack.pop())
}

const handleBst = (vm, instruction) => {
  const value = vm.stack.pop()
  const contextIndex = instruction.args[0].value // index of the context
  const variableIndex = instruction.args[1].value // index of the variable

  // Access the correct context
  let env = vm.environments.peek()
  for (let i = 0; i < contextIndex; i++) {
    if (env.parent) {
      env = env.parent
    } else {
      throw new Error('Context index out of bounds')
    }
  }
  env.setVariable(variableIndex, value)
}

const handleBld = (vm, instruction) => {
  const contextIndex = instruction.args[0].value // index of the context
  const variableIndex = instruction.args[1].value // index of the variable

  // Access the correct context
  let env = vm.environments.peek()
  for (let i = 0; i < contextIndex; i++) {
    if (env.parent) {
      env = env.parent
    } else {
      throw new Error('Context index out of bounds')
    }
  }
  vm.stack.push(env.getVariable(variableIndex))
}

const handleLdf = (vm, instruction) => {
  // todo: implementar
  return "WORK IN PROGRESS"
}

// Manejar la instrucción de llamada a función (app) input: {op: 'app'}
const handleApp = (vm, instruction) => {
  // todo: implementar
  return "WORK IN PROGRESS"
}

const handleRet = (vm) => {
  // todo: implementar
  return "WORK IN PROGRESS"
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
  hlt: handleEndOfProgram,
  ldf: handleLdf,
  app: handleApp,
  ret: handleRet,
  default: handleUnknown
}
