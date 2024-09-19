import antlr4 from 'antlr4'

export class MyErrorListener extends antlr4.error.ErrorListener {
  syntaxError (recognizer, offendingSymbol, line, column, msg, e) {
    console.error(`Error en la línea ${line}:${column} - ${msg}`)
  }
}
