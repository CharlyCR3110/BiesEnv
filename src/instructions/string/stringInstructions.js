import { Instruction } from '../Instruction.js'

// string manipulation instruction
// stk
export class StkInstruction extends Instruction {
  execute(vm) {
    // Pop 'k' from the stack, which indicates the number of characters to take.
    const k = vm.S.pop();
    const str = vm.S.pop();
    // Type verification: ensure that k is a number and str is a string.
    if (typeof k !== 'number' || typeof str !== 'string') {
      throw new Error('Invalid types: expected a number for k and a string to operate on.');
    }
    // Check that 'k' does not exceed the length of the string.
    if (k > str.length) {
      throw new Error(`Cannot take ${k} characters, string length is only ${str.length}.`);
    }
    // Extract the first 'k' characters from the string.
    const result = str.slice(0, k);
    vm.S.push(result);
  }
}

// srk
export class SrkInstruction extends Instruction {
  execute(vm) {
    // Pop 'k' from the stack, which indicates the number of characters to remove.
    const k = vm.S.pop();
    const str = vm.S.pop();
    // Type verification: ensure that k is a number and str is a string.
    if (typeof k !== 'number' || typeof str !== 'string') {
      throw new Error('Invalid types: expected a number for k and a string to operate on.');
    }
    // Check that 'k' does not exceed the length of the string.
    if (k > str.length) {
      throw new Error(`Cannot remove ${k} characters, string length is only ${str.length}.`);
    }
    // Remove the first 'k' characters from the string.
    const result = str.slice(k); // Get the substring starting from index k
    // Push the resulting substring back onto the stack.
    vm.S.push(result);
  }
}
