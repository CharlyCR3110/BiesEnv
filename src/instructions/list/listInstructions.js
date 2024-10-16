import { Instruction } from '../Instruction.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

export class LntInstruction extends Instruction {
  execute (vm) {
    const list = vm.S.pop()
    vm.S.push(!!(list === null || (list instanceof Array && list.length === 0) || list === undefined))
  }
}

export class LinInstruction extends Instruction {
  execute (vm) {
    const list = vm.S.pop()
    const value = vm.S.pop()
    list instanceof Array
      ? list.unshift(value)
      : vm.S.push([value])

    vm.S.push(list)
  }
}

export class LtkInstruction extends Instruction {
  execute (vm) {
    const k = vm.S.pop()
    const list = vm.S.pop()
    console.log(list)

    console.log(list[k])
    vm.S.push(list[k])
  }
}

export class LrkInstruction extends Instruction {
  execute (vm) {
    const k = vm.S.pop()
    const list = vm.S.pop()
    vm.S.push(list.slice(k))
  }
}

export class TolInstruction extends Instruction {
  execute (vm) {
    const value = vm.S.pop()
    // parse value to list - e.g 4 -> [4]
    vm.S.push([value])
  }
}
