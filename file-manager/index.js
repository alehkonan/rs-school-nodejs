import readline from 'node:readline/promises';
import {
  addDirectory,
  addFile,
  copyFile,
  displayFileContent,
  displayFilesAndDirectories,
  moveFile,
  removeFile,
  renameFile,
} from './utils/files.js';
import { getProcessArgument, sayGoodbye, sayHallo } from './utils/common.js';
import { COMMANDS, START_DIR } from './constants.js';
import { displayOsInfo } from './utils/os.js';
import { displayFileHash } from './utils/hash.js';
import { compressFile, decompressFile } from './utils/archive.js';
import { changeDirectory, displayCurrentDirectory } from './utils/process.js';
import { invalidInput } from './utils/errors.js';

const username = getProcessArgument('--username');

const rl = readline.createInterface(process.stdin, process.stdout);
rl.addListener('close', () => sayGoodbye(username));
rl.addListener('line', async (command) => {
  if (command === COMMANDS.EXIT) {
    sayGoodbye(username);
    process.exit();
  }
  if (command === COMMANDS.UP) {
    process.chdir('..');
    return displayCurrentDirectory();
  }
  if (command.startsWith(COMMANDS.CD)) {
    const [, dirname] = command.split(' ');
    changeDirectory(dirname);
    return displayCurrentDirectory();
  }
  if (command === COMMANDS.LIST) {
    return displayFilesAndDirectories(process.cwd());
  }
  if (command.startsWith(COMMANDS.CAT)) {
    const [, filePath] = command.split(' ');
    return displayFileContent(filePath);
  }
  if (command.startsWith(COMMANDS.ADD)) {
    const [, filename] = command.split(' ');
    return addFile(filename);
  }
  if (command.startsWith(COMMANDS.MKDIR)) {
    const [, dirname] = command.split(' ');
    return addDirectory(dirname);
  }
  if (command.startsWith(COMMANDS.RENAME)) {
    const [, filePath, newName] = command.split(' ');
    return renameFile(filePath, newName);
  }
  if (command.startsWith(COMMANDS.COPY)) {
    const [, filePath, newPath] = command.split(' ');
    return copyFile(filePath, newPath);
  }
  if (command.startsWith(COMMANDS.MOVE)) {
    const [, filePath, newPath] = command.split(' ');
    return moveFile(filePath, newPath);
  }
  if (command.startsWith(COMMANDS.REMOVE)) {
    const [, filePath] = command.split(' ');
    return removeFile(filePath);
  }
  if (command.startsWith(COMMANDS.OS)) {
    const [, param] = command.split(' ');
    return displayOsInfo(param);
  }
  if (command.startsWith(COMMANDS.HASH)) {
    const [, filePath] = command.split(' ');
    return displayFileHash(filePath);
  }
  if (command.startsWith(COMMANDS.COMPRESS)) {
    const [, filePath, destPath] = command.split(' ');
    return compressFile(filePath, destPath);
  }
  if (command.startsWith(COMMANDS.DECOMPRESS)) {
    const [, filePath, destPath] = command.split(' ');
    return decompressFile(filePath, destPath);
  }
  return invalidInput('Operation not found');
});

sayHallo(username);
process.chdir(START_DIR);
displayCurrentDirectory();
