import { StkInstruction, SrkInstruction, CatInstruction, TosInstruction } from '../../src/instructions/string/stringInstructions'

describe('String Manipulation Instructions', () => {
  let vm

  beforeEach(() => {
    vm = {
      S: []
    }
  })

  describe('StkInstruction', () => {
    it('should return the character at position k', () => {
      vm.S.push('"hello"') // str
      vm.S.push(1)
      const instruction = new StkInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('e') // 'hello'[1] => 'e'
    })

    it('should handle quotes correctly', () => {
      vm.S.push('"hello"') // str
      vm.S.push(0) // k
      const instruction = new StkInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('h') // 'hello'[0] => 'h'
    })

    it('should return null if k exceeds string length', () => {
      vm.S.push('"hi"') // str
      vm.S.push(10) // k
      const instruction = new StkInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe(null)
    })
  })

  describe('SrkInstruction', () => {
    it('should remove the first k characters from the string', () => {
      vm.S.push('hello') // str
      vm.S.push(2) // k
      const instruction = new SrkInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('llo') // 'hello'.slice(2) => 'llo'
    })

    it('should throw an error if k exceeds string length', () => {
      vm.S.push('hi') // str
      vm.S.push(10) // k
      const instruction = new SrkInstruction()
      expect(() => instruction.execute(vm)).toThrow('Cannot remove 10 characters, string length is only 2.')
    })

    it('should throw error on invalid types', () => {
      vm.S.push('hello') // str
      vm.S.push('not a number') // k
      const instruction = new SrkInstruction()
      expect(() => instruction.execute(vm)).toThrow('Invalid types: expected a number for k and a string to operate on.')
    })
  })

  describe('CatInstruction', () => {
    it('should concatenate two strings', () => {
      vm.S.push('hello') // str1
      vm.S.push('world') // str2
      const instruction = new CatInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('helloworld') // 'hello' + 'world'
    })

    it('should throw error on invalid types', () => {
      vm.S.push('hello') // str1
      vm.S.push(123) // str2
      const instruction = new CatInstruction()
      expect(() => instruction.execute(vm)).toThrow('Invalid types: expected two strings to concatenate.')
    })
  })

  describe('TosInstruction', () => {
    it('should convert a number to string', () => {
      vm.S.push(123) // value
      const instruction = new TosInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('123') // Conversion de número a cadena
    })

    it('should convert a boolean to string', () => {
      vm.S.push(true) // value
      const instruction = new TosInstruction()
      instruction.execute(vm)
      expect(vm.S.pop()).toBe('true') // Conversion de booleano a cadena
    })
  })
})
