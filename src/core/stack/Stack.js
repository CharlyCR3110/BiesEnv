/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * Stack class
 * @class
 * @classdesc A stack is a basic data structure where insertion and deletion of items take place at one end called the top of the stack. It follows the Last In, First Out (LIFO) principle.
 * @example
 * const stack = new Stack()
 * stack.push(10)
 * stack.push(20)
 * stack.push(30)
 * stack.pop() // Removes 30
 * console.log(stack.printStack()) // Prints [10, 20]
 * console.log(stack.isEmpty()) // false
 * @see {@link https://www.geeksforgeeks.org/implementation-stack-javascript/}
 */
export class Stack {
  /**
   * Creates an instance of Stack.
   * @memberof Stack
   * @constructor
   * @example
   * const stack = new Stack()
   */
  constructor () {
    this.items = []
  }

  /**
   * Adds an element to the top of the stack.
   * @param {*} element - The element to be added to the stack.
   * @memberof Stack
   * @example
   * stack.push(10)
   */
  push (element) {
    this.items.push(element)
  }

  /**
   * Removes and returns the top element of the stack.
   * @returns {*} - The top element of the stack.
   * @memberof Stack
   * @example
   * stack.push(10)
   * stack.push(20)
   * stack.pop() // Removes 20
   */
  pop () {
    if (this.items.length === 0) { throw new Error('Stack is empty') }
    return this.items.pop()
  }

  /**
   * Returns the top element of the stack without removing it.
   * @returns {*} - The top element of the stack.
   * @memberof Stack
   * @example
   * stack.push(10)
   * stack.push(20)
   * stack.peek() // Returns 20
   */
  peek () {
    return this.items[this.items.length - 1]
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} - True if the stack is empty, false otherwise.
   * @memberof Stack
   * @example
   * stack.isEmpty() // true
   * stack.push(10)
   * stack.isEmpty() // false
   */
  isEmpty () {
    return this.items.length === 0
  }

  /**
   * Prints all elements in the stack as a string.
   * @returns {string} - A string representation of the stack's elements.
   * @memberof Stack
   * @example
   * stack.push(10)
   * stack.push(20)
   * console.log(stack.printStack()) // Prints 10 20
   */
  printStack () {
    return this.items.join(' ')
  }

  /**
   * Return the element at the specified index.
   * @param {int} index - The index of the element to retrieve.
   * @returns {*} - The element at the specified index.
   */
  get (index) {
    return this.items[index]
  }

  /**
   * Return the size of the stack.
   * @returns {int} - The number of elements in the stack.
   */
  size () {
    return this.items.length
  }

  /**
   * Extracts the last 'n' elements from the stack without modifying the original stack.
   * @param {int} n - The number of elements to extract.
   * @returns {Array} - The last 'n' elements from the stack.
   */
  getLast (n) {
    const startIndex = Math.max(0, this.items.length - n) // Ensure not to go to negative indices
    return this.items.slice(startIndex) // Return the elements from the calculated index to the end
  }

  /**
   * Creates a shallow copy of the stack.
   * @returns {Stack} - A new Stack instance with the same items.
   */
  clone () {
    const newStack = new Stack()
    newStack.items = [...this.items] // Creates a shallow copy of the items array
    return newStack
  }
}
