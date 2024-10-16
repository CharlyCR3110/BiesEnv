import { LntInstruction, LinInstruction, LtkInstruction, LrkInstruction, TolInstruction } from '../../src/instructions/list/listInstructions'

const createMockVM = () => ({
  S: [] // La pila de la máquina virtual
})

describe('List Instructions', () => {
  let vm

  beforeEach(() => {
    vm = createMockVM()
  })

  test('LntInstruction should check if a list is null or empty', () => {
    vm.S.push() // Lista vacía
    const lntInst = new LntInstruction()
    lntInst.execute(vm)
    expect(vm.S.pop()).toBe(true)

    vm.S.push([1, 2, 3]) // Lista no vacía
    lntInst.execute(vm)
    expect(vm.S.pop()).toBe(false)
  })

  test('LinInstruction should add a value to the beginning of the list', () => {
    vm.S.push(1)
    vm.S.push([2, 3])
    const linInst = new LinInstruction()
    linInst.execute(vm)
    expect(vm.S.pop()).toEqual([1, 2, 3])
  })

  test('LtkInstruction should get the k-th element of the list', () => {
    vm.S.push([10, 20, 30, 40]) // Lista
    vm.S.push(2) // Índice (k)
    const ltkInst = new LtkInstruction()
    ltkInst.execute(vm)
    expect(vm.S.pop()).toBe(30) // El valor en la posición 2 es 30
  })

  test('LrkInstruction should return a slice of the list starting at index k', () => {
    vm.S.push([10, 20, 30, 40, 50]) // Lista
    vm.S.push(3) // Índice (k)
    const lrkInst = new LrkInstruction()
    lrkInst.execute(vm)
    expect(vm.S.pop()).toEqual([40, 50]) // Sublista desde el índice 3
  })

  test('TolInstruction should convert a value to a list', () => {
    vm.S.push(5) // Valor
    const tolInst = new TolInstruction()
    tolInst.execute(vm)
    expect(vm.S.pop()).toEqual([5]) // El valor 5 debe ser convertido a lista [5]
  })
})
