/* eslint-disable no-undef */
import { AddInstruction, SubInstruction, MultiplyInstruction, DivideInstruction } from '../../src/instructions/arithmetic/arithmeticInstructions'
const createMockVM = () => ({
  S: {
    stack: [],
    push (...values) {
      this.stack.push(...values)
    },
    pop () {
      return this.stack.pop()
    }
  }
})

describe('Binary Arithmetic Instructions', () => {
  let vm

  beforeEach(() => {
    vm = createMockVM()
  })

  test('AddInstruction should add two numbers', () => {
    vm.S.push(5, 3) // Simula los valores en la pila
    const addInst = new AddInstruction()
    addInst.execute(vm)
    expect(vm.S.pop()).toBe(8)
  })

  test('SubInstruction should subtract two numbers', () => {
    vm.S.push(10, 4)
    const subInst = new SubInstruction()
    subInst.execute(vm)
    expect(vm.S.pop()).toBe(6)
  })

  test('MultiplyInstruction should multiply two numbers', () => {
    vm.S.push(6, 3)
    const mulInst = new MultiplyInstruction()
    mulInst.execute(vm)
    expect(vm.S.pop()).toBe(18)
  })

  test('DivideInstruction should divide two numbers', () => {
    vm.S.push(8, 2)
    const divInst = new DivideInstruction()
    divInst.execute(vm)
    expect(vm.S.pop()).toBe(4)
  })
})
