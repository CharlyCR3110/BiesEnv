import { BldInstruction, BstInstruction, PopInstruction, PushInstruction } from './instructions/stackAndEnvInstructions.js'
import { AddInstruction, DivideInstruction, GtInstruction, MultiplyInstruction } from './instructions/arithmeticInstructions.js'
import { PrintInstruction } from './instructions/ioInstructions.js'
import { AppInstruction, LdfInstruction, RetInstruction } from './instructions/functionInstructions.js'
import { HltInstruction } from './instructions/startAndStop.js'

// Factory function to create instructions
const instructionMap = new Map([
  // stack and enviromment instructions
  ['ldv', (args) => new PushInstruction(...args)],
  ['pop', () => new PopInstruction()],
  ['bld', (args) => new BldInstruction(...args)],
  ['bst', (args) => new BstInstruction(...args)],
  // arithmetic instructions
  ['add', () => new AddInstruction()],
  ['mul', () => new MultiplyInstruction()],
  ['div', () => new DivideInstruction()],
  ['gt', () => new GtInstruction()],
  // function instructions
  ['ldf', (args) => new LdfInstruction(...args)],
  ['app', () => new AppInstruction()],
  ['ret', () => new RetInstruction()],
  // start and stop instructions
  ['hlt', () => new HltInstruction()],
  // io instructions
  ['prn', () => new PrintInstruction()]
])

export function createInstruction (op, ...args) {
  if (!instructionMap.has(op)) {
    throw new Error(`Unknown instruction ${op}`)
  }
  const returning = instructionMap.get(op)(args)
  console.log(returning)
  return returning
}
