/**
 * Represents a stack frame for a function call in the VM.
 * @class
 * @property {number} returnAddress - The address to return to after the function call.
 * @property {Context} context - The context where the function is executed.
 * @example
 * const frame = new StackFrame(10, context);
 * console.log(frame.returnAddress); // 10
 * console.log(frame.context); // Context instance
 */
export class StackFrame {
  /**
   * Creates an instance of StackFrame.
   * @param {number} returnAddress - The address to return to after the function call.
   * @param {Context} context - The context where the function is executed.
   * @param {Array} stackState - The state of the stack at the time of the function call.
   * @memberof StackFrame
   * @constructor
   * @example
   * const frame = new StackFrame(10, context, stackState);
   */
  constructor (returnAddress, context, stackState) {
    this.returnAddress = returnAddress // The address to return to
    this.context = context // The context of the function call
    this.stackState = stackState // The state of the stack at the time of the function call
  }

  /**
   * Get the context of the current stack frame.
   * @returns {Context} - The context of the function call.
   * @memberof StackFrame
   * @example
   * const context = frame.getContext();
   */
  getContext () {
    return this.context
  }

  /**
   * Get the return address of the current stack frame.
   * @returns {number} - The address to return to after the function call.
   * @memberof StackFrame
   * @example
   * const returnAddress = frame.getReturnAddress();
   */
  getReturnAddress () {
    return this.returnAddress
  }

  /**
   * Get the state of the stack at the time of the function call.
   * @returns {Array} - The state of the stack.
   * @memberof StackFrame
   * @example
   * const state = frame.getStackState();
   */
  getStackState () {
    return this.stackState
  }
}
