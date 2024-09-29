import { Instruction } from '../../Instruction.js'
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
