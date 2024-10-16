/* eslint-disable no-undef */
import { PrintInstruction, InpInstruction } from '../../src/instructions/io/ioInstructions'
import { jest } from '@jest/globals'

const createMockVM = () => ({
  S: [] // La pila de la máquina virtual
})

describe('I/O Instructions', () => {
  let vm

  beforeEach(() => {
    vm = createMockVM()
  })

  test('PrintInstruction should log the top value of the stack', () => {
    vm.S.push('Hello, world!')
    const printInst = new PrintInstruction()

    // spy on console.log
    const consoleSpy = jest.spyOn(console, 'log')

    printInst.execute(vm)

    // verifica que console.log haya sido llamado con el mensaje correct
    expect(consoleSpy).toHaveBeenCalledWith('Printing: Hello, world!')

    // restaura la función original de console.log
    consoleSpy.mockRestore()
  })

  test('InpInstruction should read input and push it onto the stack', async () => {
    const inpInst = new InpInstruction()

    // Simula la entrada de usuario
    jest.spyOn(inpInst, 'getUserInput').mockResolvedValue('Simulated Input')

    // Ejecuta la instrucción
    await inpInst.execute(vm)

    // verifica que el valor haya sido leído y pusheado correctamenteS
    expect(vm.S.pop()).toBe('Simulated Input')
  })
})
