import { Instruction } from '../Instruction.js'

export class LntInstruction extends Instruction {
  execute (vm) {
    let list= [vm.S.pop()]
    vm.S.push(list === null || list.length === 0)
  }
}

export class LinInstruction extends Instruction{
  execute(vm){
    let list= vm.S.pop()
    let value= vm.S.pop()
    list.unshift(value)
  }
}

export class LtkInstruction extends Instruction{
  execute(vm){
    let k=vm.S.pop() 
    let list= vm.S.pop()
    console.log(list)
    
    console.log(list[k])
    vm.S.push(list[k])    
  }
}

export class LrkInstruction extends Instruction{
  execute(vm){
    let k=vm.S.pop()
    let list= vm.S.pop()
    vm.S.push(list.slice(k))    
  }
}

export class TolInstruction extends Instruction{
  execute(vm){
    let list= vm.S.pop()
    vm.S.push(Array.isArray(list) ? value : [list])    
  }
}