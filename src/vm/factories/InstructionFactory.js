import { BfInstruction, BldInstruction, BrInstruction, BstInstruction, BtInstruction, EqInstruction, EqqInstruction, PopInstruction, PushInstruction, SgnInstruction, SntInstruction, SwpInstruction } from '../../instructions/stackAndEnv/stackAndEnvInstructions.js'
import { AddInstruction, DivideInstruction, GteInstruction, GtInstruction, MultiplyInstruction, NegateInstruction, SqrtInstruction, SubInstruction } from '../../instructions/arithmetic/arithmeticInstructions.js'
import { InpInstruction, PrintInstruction } from '../../instructions/io/ioInstructions.js'
import { AppInstruction, LdfInstruction, RetInstruction } from '../../instructions/functions/functionInstructions.js'
import { HltInstruction } from '../../instructions/control/startAndStop.js'
import { SrkInstruction, StkInstruction } from '../../instructions/string/stringInstructions.js'

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
<<<<<<< HEAD
  ['lt', () => new LtInstruction()],
  ['lte', () => new LteInstruction()],
  ['gte', () => new GteInstruction()],
  ['sqrt', () => new SqrtInstruction()],
  // logical instructions
  ['and', () => new AndInstruction()],
  ['or', () => new OrInstruction()],
  ['xor', () => new XorInstruction()],
  ['not', () => new NotInstruction()],
=======
  ['gte', () => new GteInstruction()],
  ['sqrt', () => new SqrtInstruction()],
  ['neg', () => new NegateInstruction()],
>>>>>>> 1ee2c641e59b222bae467156017d192abbef21ac
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
<<<<<<< HEAD
  // string instructions
  ['cat', () => new CatInstruction()],  // Concatenate
  ['tos', () => new TosInstruction()],  // To String
  ['snt', () => new SntInstruction()],  // String null test
  ['skt', (args) => new StkInstruction(...args)],
  ['srk', (args) => new SrkInstruction(...args)]
]);

export function createInstruction(op, ...args) {
=======
  //string instructions
  ['stk', (args) => new StkInstruction(...args)],
  ['srk', (args) => new SrkInstruction(...args)],
  ['snt', () => new SntInstruction()]
])

export function createInstruction (op, ...args) {
>>>>>>> 1ee2c641e59b222bae467156017d192abbef21ac
  if (!instructionMap.has(op)) {
    throw new Error(`Unknown instruction ${op}`);
  }
  const returning = instructionMap.get(op)(args);
  console.log(returning);
  return returning;
}

