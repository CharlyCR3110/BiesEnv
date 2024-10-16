import { IniInstruction, HltInstruction, AndInstruction, OrInstruction, XorInstruction, NotInstruction } from '../../src/instructions/control/startAndStop'
import { jest } from '@jest/globals'

const createMockVM = () => ({
  S: [],
  C: null,
  D: {
    updateInstructionPointer: jest.fn()
  },
  halted: false
})

describe('Control and Logic Instructions', () => {
  let vm

  beforeEach(() => {
    vm = createMockVM()
  })

  test('HltInstruction should halt the program', () => {
    const hltInst = new HltInstruction()
    hltInst.execute(vm)
    expect(vm.halted).toBe(true)
  })

  test('AndInstruction should perform logical AND on two values', () => {
    vm.S.push(true, false) // Valores en la pila
    const andInst = new AndInstruction()
    andInst.execute(vm)
    expect(vm.S.pop()).toBe(false) // Verifica que AND sea correcto (true && false = false)
  })

  test('OrInstruction should perform logical OR on two values', () => {
    vm.S.push(true, false)
    const orInst = new OrInstruction()
    orInst.execute(vm)
    expect(vm.S.pop()).toBe(true) // Verifica que OR sea correcto (true || false = true)
  })

  test('XorInstruction should perform logical XOR on two values', () => {
    vm.S.push(true, true)
    const xorInst = new XorInstruction()
    xorInst.execute(vm)
    expect(vm.S.pop()).toBe(false) // Verifica que XOR sea correcto (true XOR true = false)

    vm.S.push(true, false)
    xorInst.execute(vm)
    expect(vm.S.pop()).toBe(true) // Verifica que XOR sea correcto (true XOR false = true)
  })

  test('NotInstruction should negate a value', () => {
    vm.S.push(true)
    const notInst = new NotInstruction()
    notInst.execute(vm)
    expect(vm.S.pop()).toBe(false) // Verifica que NOT sea correcto (!true = false)
  })
})
