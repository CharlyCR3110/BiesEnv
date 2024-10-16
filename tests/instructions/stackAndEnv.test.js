import {
  PopInstruction,
  PushInstruction,
  BldInstruction,
  BrInstruction,
  BtInstruction,
  BfInstruction,
  SwpInstruction,
  SgnInstruction,
  EqInstruction,
  EqqInstruction,
  InoInstruction,
  SntInstruction
} from '../../src/instructions/stackAndEnv/stackAndEnvInstructions'

import { jest } from '@jest/globals'

// Mock para la máquina virtual
const createMockVM = () => ({
  S: [], // La pila de la máquina virtual
  B: {
    frames: {
      stack: [{
        define: jest.fn(),
        lookup: jest.fn().mockReturnValue('mockedValue') // Devuelve un valor simulado
      }],
      peek () {
        return this.stack[this.stack.length - 1]
      },
      getFrame () {
        return this.peek()
      }
    }
  },
  D: {
    currentInstructionPointer: 0,
    updateInstructionPointer (offset) {
      this.currentInstructionPointer += offset
    }
  }
})

describe('Stack Instructions', () => {
  let vm

  beforeEach(() => {
    vm = createMockVM()
  })

  test('PopInstruction should remove the top element from the stack', () => {
    vm.S.push(1)
    const popInst = new PopInstruction()
    popInst.execute(vm)
    expect(vm.S.length).toBe(0) // La pila debe estar vacía
  })

  test('PushInstruction should push values to the stack', () => {
    const pushInst = new PushInstruction()
    pushInst.args = ['42'] // String que debe convertirse en número
    pushInst.execute(vm)
    expect(vm.S.pop()).toBe(42) // Debería haber convertido y empujado 42

    pushInst.args = ['[1, 2, 3]'] // String que debe convertirse en array
    pushInst.execute(vm)
    expect(vm.S.pop()).toEqual([1, 2, 3]) // Debería haber convertido y empujado [1, 2, 3]
  })

  test('BldInstruction should push the value of a variable from the current frame to the stack', () => {
    const bldInst = new BldInstruction()
    bldInst.args = [0, 'mockVariable']
    bldInst.execute(vm)
    expect(vm.S.pop()).toBe('mockedValue') // Debería empujar el valor simulado
  })

  test('BrInstruction should update the instruction pointer', () => {
    const brInst = new BrInstruction()
    brInst.args = [5]
    brInst.execute(vm)
    expect(vm.D.currentInstructionPointer).toBe(5) // Debe actualizar el puntero
  })

  test('BtInstruction should branch if the condition is true', () => {
    const btInst = new BtInstruction()
    btInst.args = [5]
    vm.S.push(1) // Condición verdadera
    btInst.execute(vm)
    expect(vm.D.currentInstructionPointer).toBe(5) // Debe haber ramificado
  })

  test('BfInstruction should branch if the condition is false', () => {
    const bfInst = new BfInstruction()
    bfInst.args = [5]
    vm.S.push(0) // Condición falsa
    bfInst.execute(vm)
    expect(vm.D.currentInstructionPointer).toBe(5) // Debe haber ramificado
  })

  test('SwpInstruction should swap the top two elements of the stack', () => {
    vm.S.push(1)
    vm.S.push(2)
    const swpInst = new SwpInstruction()
    swpInst.execute(vm)
    expect(vm.S.pop()).toBe(1) // Debe devolver el primer elemento
    expect(vm.S.pop()).toBe(2) // Debe devolver el segundo elemento
  })

  test('SgnInstruction should push 1 if the number is positive', () => {
    vm.S.push(5)
    const sgnInst = new SgnInstruction()
    sgnInst.execute(vm)
    expect(vm.S.pop()).toBe(1) // Debe devolver 1
  })

  test('EqInstruction should check equality and push 1 or 0', () => {
    vm.S.push(1)
    vm.S.push(1)
    const eqInst = new EqInstruction()
    eqInst.execute(vm)
    expect(vm.S.pop()).toBe(1) // Debe devolver 1 para igualdades
  })

  test('EqqInstruction should check strict equality and push 1 or 0', () => {
    vm.S.push(1)
    vm.S.push(1)
    const eqqInst = new EqqInstruction()
    eqqInst.execute(vm)
    expect(vm.S.pop()).toBe(1) // Debe devolver 1 para igualdad estricta
  })

  test('InoInstruction should check if an object is an instance of a class', () => {
    class MyClass { }
    const myObject = new MyClass()
    vm.S.push(myObject)
    const inoInst = new InoInstruction()
    inoInst.args = [MyClass]
    inoInst.execute(vm)
    expect(vm.S.pop()).toBe(true) // Debe devolver true
  })

  test('SntInstruction should check if the string is null or empty', () => {
    vm.S.push('')
    const sntInst = new SntInstruction()
    sntInst.execute(vm)
    expect(vm.S.pop()).toBe(true) // Debe devolver true para cadena vacía

    vm.S.push('non-empty string')
    sntInst.execute(vm)
    expect(vm.S.pop()).toBe(false) // Debe devolver false para cadena no vacía
  })
})
