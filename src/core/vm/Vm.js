import { Stack } from '../Stack.js'
import { StackFrame } from '../StackFrame.js'
import { instructionHandlers } from './instructions.js'
import { Context } from '../Context.js'

/**
 * The Virtual Machine class is responsible for executing instructions and managing the execution state.
 * @class
 * @property {Stack} stack - The stack used for managing operations and temporary states.
 * @property {Stack} contexts - The stack of contexts for managing variable scopes.
 * @property {Stack} callStack - The stack of stack frames for managing function calls.
 * @property {Object} functions - The stored function definitions.
 * @example
 * const vm = new VM();
 * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
 * console.log(vm.stack.printStack()); // Prints result after operations
 */
export class VM {
  constructor () {
    this.stack = new Stack()
    this.contexts = new Stack() // stack of contexts
    this.callStack = new Stack() // Stack of stack frames
    this.functions = {} // Store function definitions

    // Initialize the global context
    this.contexts.push(new Context())
  }

  /**
   * Pushes a new context to the context stack.
   */
  pushContext () {
    const newContext = new Context(this.contexts.peek()) // Parent is current context
    this.contexts.push(newContext)
  }

  /**
   * Pops the current context from the context stack.
   */
  popContext () {
    if (this.contexts.size() > 1) {
      this.contexts.pop()
    } else {
      throw new Error('Cannot pop the global context')
    }
  }

  /**
   * Registers a function to be used in the VM.
   */
  registerFunction (name, func) {
    this.functions[name] = func
  }

  /**
   * Calls a function by name.
   */
  callFunction (funcName) {
    const func = this.functions[funcName]
    if (!func) throw new Error(`Function ${funcName} not found`)

    // Save the current context and instruction pointer in a stack frame
    const returnAddress = this.instructionPointer
    const currentContext = this.contexts.peek()
    const stackState = this.stack.clone() // Estado del stack actual
    const frame = new StackFrame(returnAddress, currentContext, stackState)
    this.callStack.push(frame)

    this.acualFunction = funcName

    // Push new context
    this.pushContext()

    this.instructions = func.instructions
    // Set instruction pointer to function start
    this.instructionPointer = -1
  }

  returnFromFunction () {
    // Restore previous context from stack frame
    const frame = this.callStack.pop()
    if (!frame) throw new Error('Call stack is empty')
    const remainingStack = [...this.stack.items]

    console.log('Returning from function:', this.acualFunction)
    this.popContext() // Remove current context
    this.contexts.push(frame.context) // Restore previous context

    this.stack.items = remainingStack

    // Restore instruction pointer from stack frame
    const child = this.functions[this.acualFunction]
    this.instructions = this.functions[child.parentName].instructions
    this.instructionPointer = frame.returnAddress
  }

  execute (instructions) {
    if (!instructions) {
      throw new Error('Instructions cannot be null or undefined')
    }

    this.instructions = instructions
    this.instructionPointer = 0

    while (this.instructionPointer < this.instructions?.length) {
      const instruction = this.instructions[this.instructionPointer]
      this.processInstruction(instruction)
      this.instructionPointer++
    }
  }

  processInstruction (instruction) {
    if (!instruction) {
      throw new Error('Instruction is undefined')
    }
    console.log(`Processing instruction: ${instruction.op}`)

    const handler = instructionHandlers[instruction.op]
    if (!handler) {
      throw new Error(`Unknown operation: ${instruction.op}`)
    }
    try {
      handler(this, instruction)
    } catch (e) {
      console.error(`Error processing instruction: ${instruction.op}`, e)
      throw e
    }
    console.log('Stack:', this.stack.printStack())
  }
}
