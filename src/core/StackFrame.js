/**
 * Represents a stack frame for a function call in the VM.
 * @class
 * @property {number} returnAddress - The address to return to after the function call.
 * @property {Environment} environment - The environment where the function is executed.
 * @example
 * const frame = new StackFrame(10, environment);
 * console.log(frame.returnAddress); // 10
 * console.log(frame.environment); // Environment instance
 */
export class StackFrame {
  /**
   * Creates an instance of StackFrame.
   * @param {number} returnAddress - The address to return to after the function call.
   * @param {Environment} environment - The environment where the function is executed.
   * @memberof StackFrame
   * @constructor
   * @example
   * const frame = new StackFrame(10, environment);
   */
  constructor (returnAddress, environment) {
    this.returnAddress = returnAddress // The address to return to
    this.environment = environment // The environment of the function call
  }

  /**
   * Get the environment of the current stack frame.
   * @returns {Environment} - The environment of the function call.
   * @memberof StackFrame
   * @example
   * const environment = frame.getEnvironment();
   */
  getEnvironment () {
    return this.environment
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
}
