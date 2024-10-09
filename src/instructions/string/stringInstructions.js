import { Instruction } from '../Instruction.js'

// string manipulation instruction
// stk
export class StkInstruction extends Instruction {
  execute(vm) {
    // Pop 'k' from the stack, which indicates the number of characters to take.
    let k = Number(vm.S.pop());
    let str = vm.S.pop();
    // Type verification: ensure that k is a number and str is a string.
    if (typeof k !== 'number' || typeof str !== 'string') {
        throw new Error('Invalid types: expected a number for k and a string to operate on.');
    }
    if (str[0] === '"' && str[str.length - 1] === '"') {
      // Remove the quotes by slicing the string (removes first and last character).
      str = str.slice(1, -1);
  }

    // Check that 'k' does not exceed the length of the string.
    if (k > str.length) {
      vm.S.push(null)
      return
      // throw new Error(`Cannot take ${k} characters, string length is only ${str.length}.`);
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

//cat
export class CatInstruction extends Instruction {
  execute(vm) {
    const str2 = vm.S.pop();
    const str1 = vm.S.pop();
    vm.S.push(str1 + str2);
  }
}

//tos
export class TosInstruction extends Instruction {
  execute(vm) {
    const value = vm.S.pop();
    vm.S.push(value.toString());
  }
}


