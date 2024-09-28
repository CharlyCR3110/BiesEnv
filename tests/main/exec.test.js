import { test, expect, jest } from '@jest/globals'
import { run } from '../../src/interpreter/runner'

describe('Virtual Machine Output Test', () => {
  // Mockear console.log
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('should output correct result for examples/01.basm', () => {
    run('examples/01.basm')

    // Verificar que los mensajes correctos fueron impresos en consola
    expect(logSpy).toHaveBeenCalledWith('666')
    expect(logSpy).toHaveBeenCalledWith('End of program')
    expect(logSpy).toHaveBeenCalledWith('Execution completed successfully.')
  })

  test('should output correct result for examples/02.basm', () => {
    run('examples/02.basm')

    // Verificar que los mensajes correctos fueron impresos en consola
    expect(logSpy).toHaveBeenCalledWith('666')
    expect(logSpy).toHaveBeenCalledWith('End of program')
    expect(logSpy).toHaveBeenCalledWith('Execution completed successfully.')
  })

  test('should output correct result for examples/03.basm', () => {
    run('examples/03.basm')

    expect(logSpy).toHaveBeenCalledWith(666)
    expect(logSpy).toHaveBeenCalledWith('End of program')
    expect(logSpy).toHaveBeenCalledWith('Execution completed successfully.')
  })

  test('should output correct result for examples/04.basm', () => {
    run('examples/04.basm')

    expect(logSpy).toHaveBeenCalledWith(666)
    expect(logSpy).toHaveBeenCalledWith('End of program')
    expect(logSpy).toHaveBeenCalledWith('Execution completed successfully.')
  })
})
