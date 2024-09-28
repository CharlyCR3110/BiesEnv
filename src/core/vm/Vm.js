import { Stack } from '../Stack.js'
import { Environment } from '../Environment.js'
import { StackFrame } from '../StackFrame.js'
import { instructionHandlers } from './instructions.js'
/**
 * The Virtual Machine class is responsible for executing instructions and managing the execution state.
 * @class
 * @property {Stack} stack - The stack used for managing operations and temporary states.
 * @property {Stack} environments - The stack of environments for function calls.
 * @property {Stack} callStack - The stack of stack frames for managing function calls.
 * @property {Object} functions - The stored function definitions.
 * @example
 * const vm = new VM();
 * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
 * console.log(vm.stack.printStack()); // Prints result after operations
 */
export class VM {
  /**
   * Creates an instance of VM with an empty stack and environment.
   * @memberof VM
   * @constructor
   * @example
   * const vm = new VM();
   */
  constructor () {
    this.stack = new Stack()
    this.environments = new Stack() // Stack of environments (each function call will have its own environment)
    this.callStack = new Stack() // Stack of stack frames
    this.functions = {} // Store function definitions
    this.environments.push(new Environment()) // Initial environment
  }

  /**
   * Pushes a new environment to the environment stack.
   * @memberof VM
   * @example
   * vm.pushEnvironment();
   */
  pushEnvironment () {
    const newEnvironment = new Environment()
    newEnvironment.parent = this.environments.peek() // Set parent to the current environment
    this.environments.push(newEnvironment)
  }

  /**
   * Pops the current environment from the environment stack.
   * @memberof VM
   * @example
   * vm.popEnvironment();
   */
  popEnvironment () {
    if (this.environments.size() > 1) {
      this.environments.pop()
    } else {
      throw new Error('Cannot pop the global environment')
    }
  }

  /**
   * Registers a function to be used in the VM.
   * @param {string} name - The name of the function.
   * @param {Object} func - The function to register, with a startAddress property.
   * @memberof VM
   * @example
   * vm.registerFunction('add', { startAddress: 10 });
   */
  registerFunction (name, func) {
    this.functions[name] = func
  }

  /**
   * Calls a function by name.
   * @param {string} funcName - The name of the function to call.
   * @memberof VM
   * @example
   * vm.callFunction('add');
   */
  callFunction (funcName) {
    const func = this.functions[funcName]
    if (!func) throw new Error(`Function ${funcName} not found`)

    // Save the current environment and instruction pointer in a stack frame
    const returnAddress = this.instructionPointer
    const currentEnvironment = this.environments.peek()
    const stackState = this.stack.clone() // estado del stack actual
    const frame = new StackFrame(returnAddress, currentEnvironment, stackState)
    this.callStack.push(frame)

    this.acualFunction = funcName
    // Push new environment
    this.pushEnvironment()

    this.instructions = func.instructions
    // Set instruction pointer to function start
    this.instructionPointer = -1
  }

  returnFromFunction () {
    // Restore previous environment from stack frame
    const frame = this.callStack.pop()
    if (!frame) throw new Error('Call stack is empty')
    const remainingStack = [...this.stack.items]

    this.popEnvironment() // Remove current environment
    this.environments.push(frame.environment) // Restore previous environment

    this.stack.items = [...frame.stackState.items, ...remainingStack]

    // Restore instruction pointer from stack frame

    const child = this.functions[this.acualFunction]
    // console.log(child.parentName)
    this.instructions = this.functions[child.parentName].instructions
    // this.instructions= this.functions['$0'].instructions
    this.instructionPointer = frame.returnAddress
  }

  /**
   * Executes a list of instructions.
   * @param {Array} instructions - The instructions to execute.
   * @memberof VM
   * @example
   * vm.execute([{ op: 'push', value: 5 }, { op: 'push', value: 10 }, { op: 'add' }]);
   */
  execute (instructions) {
    if (!instructions) {
      throw new Error('Instructions cannot be null or undefined')
    }

    this.instructions = instructions
    this.instructionPointer = 0

    while (this.instructionPointer < this.instructions?.length) {
      const instruction = this.instructions[this.instructionPointer]

      // debug
      // console.log('Executing instruction:', instruction)
      // console.log('Stack:', this.stack.printStack())
      // console.log('Environments:', this.environments.printStack())
      // console.log('Call stack:', this.callStack.printStack())
      // console.log('Functions:', this.functions)
      // console.log('Instruction pointer:', this.instructionPointer)
      // end debug

      this.processInstruction(instruction)
      this.instructionPointer++
    }
  }

  /**
   * Processes a single instruction.
   * @param {Object} instruction - The instruction to process.
   * @memberof VM
   * @example
   * vm.processInstruction({ op: 'push', value: 5 });
   */
  processInstruction (instruction) {
    if (!instruction) {
      throw new Error('Instruction is undefined')
    }

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
  }
}
