import fs from 'fs'
import { parse } from '../asm/biesParser.js'

/**
 * Loader for loading and preparing code for the virtual machine.
 * @module interpreter/loader
 */

/**
 * Loads a source code file and converts it into an executable format.
 * @param {string} filePath - Path to the source code file.
 * @returns {Tree} - The parsed code.
 * @throws {Error} - If there is a problem reading or processing the file.
 */
export const loadCode = (filePath) => {
  try {
    // Read the source code file
    const code = fs.readFileSync(filePath, 'utf8')

    // Parse and return the code
    return parse(code)
  } catch (error) {
    throw new Error(`Error loading code: ${error.message}`)
  }
}
