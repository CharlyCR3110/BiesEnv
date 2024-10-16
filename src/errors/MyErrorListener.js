import antlr4 from 'antlr4'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita 
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

export class MyErrorListener extends antlr4.error.ErrorListener {
  syntaxError (recognizer, offendingSymbol, line, column, msg, e) {
    console.error(`Error en la línea ${line}:${column} - ${msg}`)
  }
}
