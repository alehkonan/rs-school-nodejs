/**
 * Displays invalid input message
 * @param {string} reason
 */
export function invalidInput(reason) {
  console.log(`Invalid input: ${reason}`);
}

/**
 * Displays operation fail message
 * @param {string} reason
 */
export function operationFailed(reason) {
  console.log(`Operation failed: ${reason}`);
}
