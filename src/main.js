import fs from 'fs'
import { loadAndRun } from './interpreter/loader.js'

/**
 * @authors
 * -Raquel Alfaro Barrantes
 * -Carlos González Garita
 * -Samuel Alfaro Rodríguez
 * -Isaac Felipe Brenes Calderón
 */

/**
 * Reads a configuration file and returns the parsed JSON object.
 *
 * @param {string} configFile - The path to the configuration file.
 * @returns {Object|null} The parsed configuration data or null if an error occurs.
 */
const readConfig = (configFile) => {
  try {
    const configData = fs.readFileSync(configFile, 'utf8')
    return JSON.parse(configData)
  } catch (error) {
    console.error(`Error reading configuration file: ${error.message}`)
    return null // Returns null if there is an error
  }
}

/**
 * Sets up output redirection for standard output and error streams.
 *
 * @param {string} outfile - The file path where standard output will be redirected.
 * @param {string} errfile - The file path where error output will be redirected.
 */
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

/**
 * Main function that processes command-line arguments,
 * sets up output redirection, and executes the input file.
 */
const main = () => {
  const args = process.argv.slice(2)
  const options = {
    outfile: 'output.txt',
    errfile: 'error.txt',
    traceLevel: 0,
    inputFile: null
  }

  // Process command-line arguments
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
        options.traceLevel = config.traceLevel !== undefined ? config.traceLevel : options.traceLevel // Checks if the value is not undefined
      } else {
        console.error(`Could not load configuration from ${configFile}`)
      }
    } else {
      // Assumes it is the input file
      options.inputFile = arg
    }
  })

  // Redirect output and errors
  setupOutputRedirection(options.outfile, options.errfile)

  if (!options.inputFile) {
    console.error('No input file specified')
    process.exit(1)
  }

  loadAndRun(options.inputFile, options.traceLevel)
}

main()
