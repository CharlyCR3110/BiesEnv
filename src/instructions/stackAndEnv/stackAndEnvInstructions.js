import { Instruction } from '../Instruction.js'

export class PopInstruction extends Instruction {
  execute (vm) {
    vm.S.pop()
  }
}

// ldv
export class PushInstruction extends Instruction {
  execute (vm) {
    vm.S.push(this.args[0])
  }
}

// bld
export class BldInstruction extends Instruction {
  execute (vm) {
    const [contextIndex, variableIndex] = this.args
    const value = vm.B.frames.peek().lookup(contextIndex, variableIndex)
    console.log(`ContextIndex ${contextIndex}, VariableIndex ${variableIndex}`)
    console.log('Frame: ', vm.B.frames.peek())
    console.log(value)
    vm.S.push(value)
  }
}

// bst
export class BstInstruction extends Instruction {
  execute (vm) {
    const value = vm.S.pop()
    const [contextIndex, variableIndex] = this.args
    vm.B.getFrame(contextIndex).define(variableIndex, value)
    console.log(`Saving local ${contextIndex} , ${variableIndex}, value: ${value}`)
  }
}

// br
export class BrInstruction extends Instruction {
  execute(vm) {
    const offset = vm.S.pop();
    // Type verification: ensure that offset is a number.
    if (typeof offset !== 'number') {
      throw new Error('Invalid type: expected a number for the offset.');
    }
    // Calculate the new instruction pointer position by adding the offset.
    vm.D.updateInstructionPointer(offset);
    console.log(`Branching to instruction pointer offset: ${offset}`);
  }
}

// bt
export class BtInstruction extends Instruction {
  execute(vm) {
    const condition = vm.S.pop();
    // Type verification: ensure that condition is a boolean.
    if (typeof condition !== 'boolean') {
      throw new Error('Invalid type: expected a boolean for the condition.');
    }
    const offset = vm.S.pop();
    // Type verification: ensure that offset is a number.
    if (typeof offset !== 'number') {
      throw new Error('Invalid type: expected a number for the offset.');
    }
    // If the condition is true, update the instruction pointer with the offset.
    if (condition) {
      vm.D.updateInstructionPointer(offset);
      console.log(`Branching to instruction pointer offset: ${offset} due to true condition.`);
    } else {
      console.log('Condition was false; not branching.');
    }
  }
}

// bf
export class BfInstruction extends Instruction {
  execute(vm) {
    const condition = vm.S.pop();
    // Type verification: ensure that condition is a boolean.
    if (typeof condition !== 'boolean') {
      throw new Error('Invalid type: expected a boolean for the condition.');
    }
    const offset = vm.S.pop();
    // Type verification: ensure that offset is a number.
    if (typeof offset !== 'number') {
      throw new Error('Invalid type: expected a number for the offset.');
    }
    // If the condition is false, update the instruction pointer with the offset.
    if (!condition) {
      vm.D.updateInstructionPointer(offset);
      console.log(`Branching to instruction pointer offset: ${offset} due to false condition.`);
    } else {
      console.log('Condition was true; not branching.');
    }
  }
}

// swp
export class SwpInstruction extends Instruction {
  execute(vm) {
    // Ensure there are at least two elements in the stack.
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to perform swap.');
    }
    // Pop the top two elements from the stack.
    const a = vm.S.pop();
    const b = vm.S.pop();
    // Push them back onto the stack in reversed order.
    vm.S.push(a);
    vm.S.push(b);
    console.log(`Swapped top two elements: ${b} and ${a}`);
  }
}

// sgn
export class SgnInstruction extends Instruction {
  execute(vm) {
    if (vm.S.length < 1) {
      throw new Error('Not enough elements in the stack to evaluate sign.');
    }
    const number = vm.S.pop();
    // Check the sign of the number and push 1 if it's greater than 0, otherwise push 0.
    if (number > 0) {
      vm.S.push(1);  // Push 1 if the number is positive
    } else {
      vm.S.push(0);  // Push 0 if the number is zero or negative
    }
  }
}

// eq
export class EqInstruction extends Instruction {
  execute(vm) {
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to evaluate equality.');
    }
    const b = vm.S.pop();
    const a = vm.S.pop();
    // Check if the two values are equal and push 1 for true, 0 for false.
    vm.S.push(a === b ? 1 : 0);
  }
}

// eqq
export class EqqInstruction extends Instruction {
  execute(vm) {
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to evaluate strict equality.');
    }
    const b = vm.S.pop();
    const a = vm.S.pop();
    // Check if the two values are strictly equal and push 1 for true, 0 for false.
    vm.S.push(a === b ? 1 : 0);
  }
}