import fs from 'node:fs/promises';
import { invalidInput, operationFailed } from './errors.js';

/**
 * Displays sorted files and directories in the path, directories are always on the top
 * @param {PathLike} path
 */
export async function displayFilesAndDirectories(path) {
  const dirs = [];
  const files = [];
  const fileNames = await fs.readdir(path);

  for await (const name of fileNames) {
    const stat = await fs.stat(name);
    if (stat.isDirectory()) dirs.push({ name, type: 'directory' });
    if (stat.isFile()) files.push({ name, type: 'file' });
  }

  console.table([...dirs, ...files], ['name', 'type']);
}

/**
 * Displays file's content
 * @param {PathLike} filePath
 */
export async function displayFileContent(filePath) {
  if (!filePath) return invalidInput('filePath is not defined');
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Adds empty file in the current directory
 * @param {string} filename
 */
export async function addFile(filename) {
  if (!filename) return invalidInput('filename is not defined');
  try {
    await fs.writeFile(filename, '');
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Adds new directory in the current directory
 * @param {string} dirname
 */
export async function addDirectory(dirname) {
  if (!dirname) return invalidInput('dirname is not defined');
  try {
    await fs.mkdir(dirname);
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Changes the name for the file
 * @param {PathLike} filePath
 * @param {string} filename
 */
export async function renameFile(filePath, filename) {
  if (!filePath) return invalidInput('filePath is not defined');
  if (!filename) return invalidInput('filename is not defined');

  try {
    await fs.rename(filePath, filename);
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Copies the file to new location
 * @param {PathLike} filePath
 * @param {PathLike} destPath
 */
export async function copyFile(filePath, destPath) {
  if (!filePath) return invalidInput('filePath is not defined');
  if (!destPath) return invalidInput('destPath is not defined');

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) return fs.cp(filePath, destPath);
    if (stat.isFile()) return fs.copyFile(filePath, destPath);
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Removes the file
 * @param {PathLike} filePath
 */
export async function removeFile(filePath) {
  if (!filePath) return invalidInput('filePath is not defined');

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) return fs.rmdir(filePath);
    if (stat.isFile()) return fs.rm(filePath);
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Moves the file to new location
 * @param {PathLike} filePath
 * @param {PathLike} destPath
 */
export async function moveFile(filePath, destPath) {
  if (!filePath) return invalidInput('filePath is not defined');
  if (!destPath) return invalidInput('destPath is not defined');

  try {
    await copyFile(filePath, destPath);
    await removeFile(filePath);
  } catch (error) {
    return operationFailed(error.message);
  }
}
