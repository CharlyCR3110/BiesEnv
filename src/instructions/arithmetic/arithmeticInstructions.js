import { Instruction } from '../Instruction.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */

// binary arithmetic instructions

/**
 * Represents an instruction to add two values.
 * @class
 * @extends Instruction
 * @classdesc The AddInstruction class implements the execution of the addition operation
 * on the top two values of the stack.
 */
export class AddInstruction extends Instruction {
  /**
   * Executes the addition operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof AddInstruction
   * @example
   * const addInstruction = new AddInstruction();
   * addInstruction.execute(vm);
   */
  execute (vm) {
    const b = parseInt(vm.S.pop())
    const a = parseInt(vm.S.pop())
    vm.S.push(a + b)
  }
}

// sub

/**
 * Represents an instruction to subtract two values.
 * @class
 * @extends Instruction
 * @classdesc The SubInstruction class implements the execution of the subtraction operation
 * on the top two values of the stack.
 */
export class SubInstruction extends Instruction {
  /**
   * Executes the subtraction operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof SubInstruction
   * @example
   * const subInstruction = new SubInstruction();
   * subInstruction.execute(vm);
   */
  execute (vm) {
    const b = parseInt(vm.S.pop())
    const a = parseInt(vm.S.pop())
    vm.S.push(a - b)
  }
}

// mul

/**
 * Represents an instruction to multiply two values.
 * @class
 * @extends Instruction
 * @classdesc The MultiplyInstruction class implements the execution of the multiplication operation
 * on the top two values of the stack.
 */
export class MultiplyInstruction extends Instruction {
  /**
   * Executes the multiplication operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof MultiplyInstruction
   * @example
   * const multiplyInstruction = new MultiplyInstruction();
   * multiplyInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a * b)
  }
}

// div

/**
 * Represents an instruction to divide two values.
 * @class
 * @extends Instruction
 * @classdesc The DivideInstruction class implements the execution of the division operation
 * on the top two values of the stack.
 */
export class DivideInstruction extends Instruction {
  /**
   * Executes the division operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof DivideInstruction
   * @example
   * const divideInstruction = new DivideInstruction();
   * divideInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a / b)
  }
}

// unary arithmetic instructions

/**
 * Represents an instruction to negate a value.
 * @class
 * @extends Instruction
 * @classdesc The NegateInstruction class implements the execution of the negation operation
 * on the top value of the stack.
 */
export class NegateInstruction extends Instruction {
  /**
   * Executes the negation operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof NegateInstruction
   * @example
   * const negateInstruction = new NegateInstruction();
   * negateInstruction.execute(vm);
   */
  execute (vm) {
    vm.S.push(-vm.S.pop())
  }
}

// relational instructions

/**
 * Represents an instruction to compare if one value is greater than another.
 * @class
 * @extends Instruction
 * @classdesc The GtInstruction class implements the execution of the greater-than comparison
 * on the top two values of the stack.
 */
export class GtInstruction extends Instruction {
  /**
   * Executes the greater-than comparison operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof GtInstruction
   * @example
   * const gtInstruction = new GtInstruction();
   * gtInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    console.log(`tss ${a} > ${b}: `, Number(a) > Number(b))
    vm.S.push(Number(a) > Number(b) ? 1 : 0)
  }
}

/**
 * Represents an instruction to compare if one value is greater than or equal to another.
 * @class
 * @extends Instruction
 * @classdesc The GteInstruction class implements the execution of the greater-than-or-equal comparison
 * on the top two values of the stack.
 */
export class GteInstruction extends Instruction {
  /**
   * Executes the greater-than-or-equal comparison operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof GteInstruction
   * @example
   * const gteInstruction = new GteInstruction();
   * gteInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(Number(a) >= Number(b) ? 1 : 0)
  }
}

/**
 * Represents an instruction to compare if one value is less than another.
 * @class
 * @extends Instruction
 * @classdesc The LtInstruction class implements the execution of the less-than comparison
 * on the top two values of the stack.
 */
export class LtInstruction extends Instruction {
  /**
   * Executes the less-than comparison operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof LtInstruction
   * @example
   * const ltInstruction = new LtInstruction();
   * ltInstruction.execute(vm);
   */
  execute (vm) {
    const b = Number(vm.S.pop())
    const a = Number(vm.S.pop())
    vm.S.push(Number(a) < Number(b) ? 1 : 0)
  }
}

/**
 * Represents an instruction to compare if one value is less than or equal to another.
 * @class
 * @extends Instruction
 * @classdesc The LteInstruction class implements the execution of the less-than-or-equal comparison
 * on the top two values of the stack.
 */
export class LteInstruction extends Instruction {
  /**
   * Executes the less-than-or-equal comparison operation.
   * @param {object} vm - The virtual machine instance containing the stack.
   * @memberof LteInstruction
   * @example
   * const lteInstruction = new LteInstruction();
   * lteInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a <= b ? 1 : 0)
  }
}

export class PowInstruction extends Instruction {
  execute (vm) {
    const exponent= vm.S.pop()
    const base= vm.S.pop()
    const result = base ** exponent
    console.log(`Base ${base}, exponent ${exponent}`)
    console.log(result)
    vm.S.push(result)
  }
}
