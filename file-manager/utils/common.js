/**
 * Logs greeting message for the user
 * @param {string} username
 */
export function sayHallo(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
}

/**
 * Logs goodbye message for the user
 * @param {string} username
 */
export function sayGoodbye(username) {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

/**
 * Get process argument from cli input by key
 * @param {string} key
 * @returns {string | undefined}
 * @example
 * npm run start -- name=Test
 * getProcessArgument(name) // 'Test'
 */
export function getProcessArgument(key) {
  const [, , ...args] = process.argv;
  const argMap = Object.fromEntries(args.map((arg) => arg.split('=')));
  return argMap[key];
}
