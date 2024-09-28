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

// const handleSubtract = (vm) => {
//   const x = vm.stack.pop()
//   const y = vm.stack.pop()
//   vm.stack.push(x - y)
// }

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

const handlePrint = (vm) => {
  console.log(vm.stack.pop())
}

const handleBst = (vm, instruction) => {
  const value = vm.stack.pop()
  const contextIndex = instruction.args[0].value // index of the context
  const variableIndex = instruction.args[1].value // index of the variable

  // get the context from the top of the stack
  let context = vm.contexts.peek()
  for (let i = 0; i < contextIndex; i++) {
    if (context.parent) {
      context = context.parent // navigate to the parent context
    } else {
      throw new Error('Context index out of bounds') // context index out of bounds
    }
  }

  context.setVariable(variableIndex, value) // set the variable in the context
}

const handleBld = (vm, instruction) => {
  const contextIndex = instruction.args[0].value // context index
  const variableIndex = instruction.args[1].value // variable index

  let context = vm.contexts.peek() // get the context from the top of the stack
  for (let i = 0; i < contextIndex; i++) {
    if (context.parent) {
      context = context.parent // go to the parent context
    } else {
      throw new Error('Context index out of bounds') // index out of bounds
    }
  }

  vm.stack.push(context.getVariable(variableIndex)) // get the variable from the context and push it to the stack
}

const handleLdf = (vm, instruction) => {
  vm.stack.push(instruction.args[0].value) // instruction.args[0].value is the function name (e.g., '$2')
}

const handleApp = (vm, instruction) => {
  // get the function name from the stack
  const functionName = vm.stack.pop()
  vm.callFunction(functionName)
}

const handleRet = (vm) => {
  vm.returnFromFunction()
}

const handleEndOfProgram = (vm) => {
  console.log('End of program')
}

const handleUnknown = (vm, instruction) => {
  console.error(`Unknown instruction: ${instruction.op}`)
}

const handleGT = (vm) => {
  const a = vm.stack.pop()
  const b = vm.stack.pop()
  vm.stack.push(a > b ? 1 : 0)
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
  gt: handleGT,
  default: handleUnknown
}
