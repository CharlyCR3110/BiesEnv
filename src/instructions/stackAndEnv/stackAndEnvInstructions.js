import { Instruction } from '../Instruction.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita 
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

export class PopInstruction extends Instruction {
  execute (vm) {
    vm.S.pop()
  }
}

// ldv
export class PushInstruction extends Instruction {
  execute (vm) {
    const value = this.args[0];

    // Intenta convertir la cadena a un array si es necesario
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      // Convierte la cadena a un array
      const parsedArray = JSON.parse(value);
      vm.S.push(parsedArray);
    } else if (!isNaN(value)) {
      // Si el valor no es una cadena y puede convertirse a número, lo guarda como NUMBER
      vm.S.push(Number(value));
    }
      else {
      // Empuja el valor tal como está
      vm.S.push(value);
    }
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
  execute (vm) {
    const offset = this.args
    // Type verification: ensure that offset is a number.
    // if (typeof offset !== 'number') {
    //   throw new Error('Invalid type: expected a number for the offset.');
    // }
    // Calculate the new instruction pointer position by adding the offset.
    const pc = Number(offset) + Number(vm.D.currentInstructionPointer)
    vm.D.updateInstructionPointer(pc)
    console.log(`Branching to instruction pointer offset: ${offset}`)
  }
}

// bt
export class BtInstruction extends Instruction {
  execute (vm) {
    const condition = vm.S.pop()
    // Type verification: ensure that condition is a boolean.
    // if (typeof condition !== 'boolean') {
    //   throw new Error('Invalid type: expected a boolean for the condition.');
    // }
    const offset = this.args
    // // Type verification: ensure that offset is a number.
    // if (typeof offset !== 'number') {
    //   throw new Error('Invalid type: expected a number for the offset.');
    // }
    console.log(`Offset ${offset} & instruction poninter: ${vm.D.currentInstructionPointer}`)
    console.log(`New instruction pointer: ${Number(offset) + Number(vm.D.currentInstructionPointer)}`)
    const pc = Number(offset) + Number(vm.D.currentInstructionPointer)
    // If the condition is true, update the instruction pointer with the offset.
    if (Number(condition) === 1) {
      vm.D.updateInstructionPointer(pc)
      console.log(`Branching to instruction pointer offset: ${offset} due to true condition.`)
    } else {
      console.log('Condition was false; not branching.')
    }
  }
}

// bf
export class BfInstruction extends Instruction {
  execute (vm) {
    const condition = vm.S.pop()
    // Type verification: ensure that condition is a number (0 or 1).
    if (typeof condition !== 'number' || (condition !== 0 && condition !== 1)) {
      throw new Error('Invalid value: expected a number (0 or 1) for the condition.')
    }
    const offset = this.args
    // Type verification: ensure that offset is a number.
    // if (typeof offset !== 'number') {
    //   throw new Error('Invalid type: expected a number for the offset.');
    // }
    // If the condition is 0, update the instruction pointer with the offset.
    console.log(`Offset ${offset} & instruction poninter: ${vm.D.currentInstructionPointer}`)
    console.log(`New instruction pointer: ${Number(offset) + Number(vm.D.currentInstructionPointer)}`)
    const pc = Number(offset) + Number(vm.D.currentInstructionPointer)
    if (Number(condition) === 0) {
      vm.D.updateInstructionPointer(pc)
      console.log(`Branching to instruction pointer offset: ${offset} due to condition being 0.`)
    } else {
      console.log('Condition was 1; not branching.')
    }
  }
}

// swp
export class SwpInstruction extends Instruction {
  execute (vm) {
    // Ensure there are at least two elements in the stack.
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to perform swap.')
    }
    // Pop the top two elements from the stack.
    const a = vm.S.pop()
    const b = vm.S.pop()
    // Push them back onto the stack in reversed order.
    vm.S.push(a)
    vm.S.push(b)
    console.log(`Swapped top two elements: ${b} and ${a}`)
  }
}

// sgn
export class SgnInstruction extends Instruction {
  execute (vm) {
    if (vm.S.length < 1) {
      throw new Error('Not enough elements in the stack to evaluate sign.')
    }
    const number = vm.S.pop()
    // Check the sign of the number and push 1 if it's greater than 0, otherwise push 0.
    if (number > 0) {
      vm.S.push(1) // Push 1 if the number is positive
    } else {
      vm.S.push(0) // Push 0 if the number is zero or negative
    }
  }
}

// eq
export class EqInstruction extends Instruction {
  execute (vm) {
    console.log('EqInstruction')
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to evaluate equality.')
    }
    const b = vm.S.pop()
    const a = vm.S.pop()
    // Check if the two values are equal and push 1 for true, 0 for false.
    // eslint-disable-next-line eqeqeq
    vm.S.push(a == b ? 1 : 0)
    // eslint-disable-next-line eqeqeq
    console.log(`Equals : ${a} == ${b} : ${a == b}`)
  }
}

// eqq
export class EqqInstruction extends Instruction {
  execute (vm) {
    if (vm.S.length < 2) {
      throw new Error('Not enough elements in the stack to evaluate strict equality.')
    }
    const b = vm.S.pop()
    const a = vm.S.pop()
    // Check if the two values are strictly equal and push 1 for true, 0 for false.
    vm.S.push(a === b ? 1 : 0)
  }
}

// ino
export class InoInstruction extends Instruction {
  execute (vm) {
    const obj = vm.S.pop()
    const className = this.args[0]
    vm.S.push(obj instanceof className)
  }
}

// snt
export class SntInstruction extends Instruction {
  execute (vm) {
    const str = vm.S.pop()
    vm.S.push(str === null || str === '')
  }
}
