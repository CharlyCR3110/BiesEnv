import fs from 'fs'
import { loadAndRun } from './interpreter/loader.js'

const readConfig = (configFile) => {
  try {
    const configData = fs.readFileSync(configFile, 'utf8')
    return JSON.parse(configData)
  } catch (error) {
    console.error(`Error al leer el archivo de configuración: ${error.message}`)
    return null // Retorna null si hay un error
  }
}

const setupOutputRedirection = (outfile, errfile) => {
  const originalStdoutWrite = process.stdout.write
  const originalStderrWrite = process.stderr.write

  process.stdout.write = (chunk) => {
    originalStdoutWrite.call(process.stdout, chunk)
    fs.appendFileSync(outfile, chunk)
  }

  process.stderr.write = (chunk) => {
    originalStderrWrite.call(process.stderr, chunk)
    fs.appendFileSync(errfile, chunk)
  }
}

const main = () => {
  const args = process.argv.slice(2)
  const options = {
    outfile: 'output.txt',
    errfile: 'error.txt',
    traceLevel: 0,
    inputFile: null
  }

  // Procesar los argumentos de la línea de comandos
  args.forEach((arg) => {
    if (arg.startsWith('--o=')) {
      options.outfile = arg.split('=')[1]
    } else if (arg.startsWith('--e=')) {
      options.errfile = arg.split('=')[1]
    } else if (arg.startsWith('--trace=')) {
      options.traceLevel = parseInt(arg.split('=')[1], 10)
    } else if (arg.startsWith('--use-config=')) {
      const configFile = arg.split('=')[1] || '.config_biesm.json'
      const config = readConfig(configFile)
      if (config) {
        options.outfile = config.outfile || options.outfile
        options.errfile = config.errfile || options.errfile
        options.traceLevel = config.traceLevel !== undefined ? config.traceLevel : options.traceLevel // Verifica que el valor no sea undefined
      } else {
        console.error(`No se pudo cargar la configuración de ${configFile}`)
      }
    } else {
      // se asume que es el input file
      options.inputFile = arg
    }
  })

  // Redirigir la salida y los errores
  setupOutputRedirection(options.outfile, options.errfile)

  if (!options.inputFile) {
    console.error('No se ha especificado un archivo de entrada')
    process.exit(1)
  }

  loadAndRun(options.inputFile, options.traceLevel)
}

main()
