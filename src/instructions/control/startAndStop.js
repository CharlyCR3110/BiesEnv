import { Instruction } from '../Instruction.js'
// ([[INI N]|C], [], [], [[]]) => (C, S, B, D) si código C es cargado, S, B y D
// inicializados y D.current = C

// ini
export class IniInstruction extends Instruction {
  execute (vm) {
    vm.C = this.args[0]
    vm.D.updateInstructionPointer(0)
  }
}

// hlt
export class HltInstruction extends Instruction {
  execute (vm) {
    console.log('End of program')
    vm.halted = true
  }
}

//and
export class AndInstruction extends Instruction {
  execute(vm) {
    const b = vm.S.pop();
    const a = vm.S.pop();
    vm.S.push(a && b);
  }
}

//or
export class OrInstruction extends Instruction {
  execute(vm) {
    const b = vm.S.pop();
    const a = vm.S.pop();
    vm.S.push(a || b);
  }
}

//xor
export class XorInstruction extends Instruction {
  execute(vm) {
    const b = vm.S.pop();
    const a = vm.S.pop();
    vm.S.push((a || b) && !(a && b));
  }
}

//not
export class NotInstruction extends Instruction {
  execute(vm) {
    const a = vm.S.pop();
    vm.S.push(!a);
  }
}