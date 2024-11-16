import { BfInstruction, BldInstruction, BrInstruction, BstInstruction, BtInstruction, EqInstruction, EqqInstruction, InoInstruction, PopInstruction, PushInstruction, SgnInstruction, SntInstruction, SwpInstruction } from '../../instructions/stackAndEnv/stackAndEnvInstructions.js'
import { AddInstruction, DivideInstruction, GteInstruction, GtInstruction, LteInstruction, LtInstruction, MultiplyInstruction, NegateInstruction, PowInstruction, SubInstruction } from '../../instructions/arithmetic/arithmeticInstructions.js'
import { InpInstruction, PrintInstruction } from '../../instructions/io/ioInstructions.js'
import { AppInstruction, CstInstruction, LdfInstruction, RetInstruction } from '../../instructions/functions/functionInstructions.js'
import { AndInstruction, HltInstruction, NotInstruction, OrInstruction, XorInstruction } from '../../instructions/control/startAndStop.js'
import { CatInstruction, SrkInstruction, StkInstruction, TosInstruction } from '../../instructions/string/stringInstructions.js'
import { LntInstruction, LinInstruction, LtkInstruction, LrkInstruction, TolInstruction, LenInstruction } from '../../instructions/list/listInstructions.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

// Factory function to create instructions
const instructionMap = new Map([
  // stack and environment instructions
  ['ldv', (args) => new PushInstruction(...args)],
  ['pop', () => new PopInstruction()],
  ['bld', (args) => new BldInstruction(...args)],
  ['bst', (args) => new BstInstruction(...args)],
  ['br', (args) => new BrInstruction(...args)],
  ['bt', (args) => new BtInstruction(...args)],
  ['bf', (args) => new BfInstruction(...args)],
  ['swp', () => new SwpInstruction()],
  ['sgn', () => new SgnInstruction()],
  ['eq', () => new EqInstruction()],
  ['eqq', () => new EqqInstruction()],
  ['ino', (args) => new InoInstruction(...args)], // Instance of check
  // arithmetic instructions
  ['add', () => new AddInstruction()],
  ['sub', () => new SubInstruction()],
  ['mul', () => new MultiplyInstruction()],
  ['div', () => new DivideInstruction()],
  ['gt', () => new GtInstruction()],
  ['lt', () => new LtInstruction()],
  ['lte', () => new LteInstruction()],
  ['gte', () => new GteInstruction()],
  ['neg', () => new NegateInstruction()],
  // logical instructions
  ['and', () => new AndInstruction()],
  ['or', () => new OrInstruction()],
  ['xor', () => new XorInstruction()],
  ['not', () => new NotInstruction()],
  // function instructions
  ['ldf', (args) => new LdfInstruction(...args)],
  ['app', () => new AppInstruction()],
  ['ret', () => new RetInstruction()],
  ['cst', (args) => new CstInstruction(...args)], // Casting
  // start and stop instructions
  ['hlt', () => new HltInstruction()],
  // io instructions
  ['prn', () => new PrintInstruction()],
  ['inp', () => new InpInstruction()],
  // string instructions
  ['cat', () => new CatInstruction()], // Concatenate
  ['tos', () => new TosInstruction()], // To String
  ['snt', () => new SntInstruction()], // String null test
  ['stk', (args) => new StkInstruction(...args)],
  ['srk', (args) => new SrkInstruction(...args)],
  ['lnt', () => new LntInstruction()],
  ['lin', () => new LinInstruction()],
  ['ltk', () => new LtkInstruction()],
  ['lrk', () => new LrkInstruction()],
  ['tol', () => new TolInstruction()],
  ['len', () => new LenInstruction()],
  ['pow', ()=> new PowInstruction()]
])

/**
 * Creates an instruction based on the provided operation and arguments.
 *
 * @param {string} op - The operation code for the instruction to be created.
 * @param {...*} args - The arguments to be passed to the instruction constructor.
 * @returns {Object} The created instruction instance.
 * @throws {Error} Throws an error if the operation code is not recognized.
 * @example
 * const instruction = createInstruction('add');
 */
export function createInstruction (op, ...args) {
  if (!instructionMap.has(op)) {
    throw new Error(`Unknown instruction ${op}`)
  }
  const returning = instructionMap.get(op)(args)
  console.log(returning)
  return returning
}
