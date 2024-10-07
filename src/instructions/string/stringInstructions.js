import { Instruction } from '../Instruction.js'

// string manipulation instruction
// stk
export class StkInstruction extends Instruction {
  // The execute method is called when this instruction is executed in the virtual machine (vm).
  execute(vm) {
    // Pop 'n' from the stack, which indicates the number of characters to take.
    const n = vm.S.pop();

    // Pop the string from the stack.
    const str = vm.S.pop();

    // Type verification: ensure that n is a number and str is a string.
    if (typeof n !== 'number' || typeof str !== 'string') {
      throw new Error('Invalid types: expected a number for n and a string to operate on.');
    }

    // Check that 'n' does not exceed the length of the string.
    if (n > str.length) {
      throw new Error(`Cannot take ${n} characters, string length is only ${str.length}.`);
    }

    // Extract the first 'n' characters from the string.
    const result = str.slice(0, n);

    // Push the resulting substring back onto the stack.
    vm.S.push(result);
  }
}
