import { Instruction } from '../Instruction.js'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 */

// ini

/**
 * Represents an instruction to initialize the virtual machine state.
 * @class
 * @extends Instruction
 * @classdesc The IniInstruction class implements the execution of the initialization operation,
 * setting the initial state of the virtual machine.
 */
export class IniInstruction extends Instruction {
  /**
   * Executes the initialization operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof IniInstruction
   * @example
   * const iniInstruction = new IniInstruction();
   * iniInstruction.execute(vm);
   */
  execute (vm) {
    vm.C = this.args[0]
    vm.D.updateInstructionPointer(0)
  }
}

// hlt

/**
 * Represents an instruction to halt the execution of the virtual machine.
 * @class
 * @extends Instruction
 * @classdesc The HltInstruction class implements the execution of the halt operation,
 * signaling the end of the program.
 */
export class HltInstruction extends Instruction {
  /**
   * Executes the halt operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof HltInstruction
   * @example
   * const hltInstruction = new HltInstruction();
   * hltInstruction.execute(vm);
   */
  execute (vm) {
    console.log('End of program')
    vm.halted = true
  }
}

// and

/**
 * Represents an instruction to perform a logical AND operation.
 * @class
 * @extends Instruction
 * @classdesc The AndInstruction class implements the execution of the AND operation
 * on the top two values of the stack.
 */
export class AndInstruction extends Instruction {
  /**
   * Executes the AND operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof AndInstruction
   * @example
   * const andInstruction = new AndInstruction();
   * andInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a && b)
  }
}

// or

/**
 * Represents an instruction to perform a logical OR operation.
 * @class
 * @extends Instruction
 * @classdesc The OrInstruction class implements the execution of the OR operation
 * on the top two values of the stack.
 */
export class OrInstruction extends Instruction {
  /**
   * Executes the OR operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof OrInstruction
   * @example
   * const orInstruction = new OrInstruction();
   * orInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push(a || b)
  }
}

// xor

/**
 * Represents an instruction to perform a logical XOR operation.
 * @class
 * @extends Instruction
 * @classdesc The XorInstruction class implements the execution of the XOR operation
 * on the top two values of the stack.
 */
export class XorInstruction extends Instruction {
  /**
   * Executes the XOR operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof XorInstruction
   * @example
   * const xorInstruction = new XorInstruction();
   * xorInstruction.execute(vm);
   */
  execute (vm) {
    const b = vm.S.pop()
    const a = vm.S.pop()
    vm.S.push((a || b) && !(a && b))
  }
}

// not

/**
 * Represents an instruction to perform a logical NOT operation.
 * @class
 * @extends Instruction
 * @classdesc The NotInstruction class implements the execution of the NOT operation
 * on the top value of the stack.
 */
export class NotInstruction extends Instruction {
  /**
   * Executes the NOT operation.
   * @param {object} vm - The virtual machine instance.
   * @memberof NotInstruction
   * @example
   * const notInstruction = new NotInstruction();
   * notInstruction.execute(vm);
   */
  execute (vm) {
    const a = vm.S.pop()
    vm.S.push(!a)
  }
}
