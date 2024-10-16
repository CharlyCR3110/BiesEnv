import antlr4 from 'antlr4'

/**
 * @authors
 * - Raquel Alfaro Barrantes
 * - Carlos González Garita
 * - Samuel Alfaro Rodríguez
 * - Isaac Felipe Brenes Calderón
 *
 * MyErrorListener class extends the ANTLR error listener to handle syntax errors.
 * @class
 * @extends antlr4.error.ErrorListener
 * @classdesc This class provides a custom implementation of the ANTLR error listener
 * to capture and log syntax errors encountered during parsing.
 */

export class MyErrorListener extends antlr4.error.ErrorListener {
  /**
   * Called when a syntax error is detected.
   * @param {object} recognizer - The parser instance.
   * @param {object} offendingSymbol - The symbol that caused the error.
   * @param {number} line - The line number where the error occurred.
   * @param {number} column - The column number where the error occurred.
   * @param {string} msg - The error message.
   * @param {Error} e - The exception that was thrown.
   * @memberof MyErrorListener
   * @example
   * // Example of how the error message might be logged
   * const listener = new MyErrorListener()
   * listener.syntaxError(recognizer, offendingSymbol, line, column, msg, e)
   */
  syntaxError (recognizer, offendingSymbol, line, column, msg, e) {
    console.error(`Error en la línea ${line}:${column} - ${msg}`)
  }
}
