import { invalidInput, operationFailed } from './errors.js';

/**
 * Displays current directory
 */
export function displayCurrentDirectory() {
  console.log(process.cwd());
}

/**
 * Changes current directory
 * @param {PathLike} dirname
 */
export function changeDirectory(dirname) {
  if (!dirname) return invalidInput('dirname is not defined');

  try {
    process.chdir(dirname);
  } catch (error) {
    return operationFailed(error.message);
  }
}
