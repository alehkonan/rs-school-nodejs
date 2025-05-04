import fs from 'node:fs';
import stream from 'node:stream/promises';
import zlib from 'node:zlib';
import { invalidInput, operationFailed } from './errors.js';

/**
 * Compresses the file
 * @param {PathLike} filePath
 * @param {PathLike} destPath
 */
export async function compressFile(filePath, destPath) {
  if (!filePath) return invalidInput('filePath is not defined');
  if (!destPath) return invalidInput('destPath is not defined');

  try {
    await stream.pipeline(
      fs.createReadStream(filePath),
      zlib.createBrotliCompress(),
      fs.createWriteStream(destPath)
    );
  } catch (error) {
    return operationFailed(error.message);
  }
}

/**
 * Decompresses the file
 * @param {PathLike} filePath
 * @param {PathLike} destPath
 */
export async function decompressFile(filePath, destPath) {
  if (!filePath) return invalidInput('filePath is not defined');
  if (!destPath) return invalidInput('destPath is not defined');

  try {
    await stream.pipeline(
      fs.createReadStream(filePath),
      zlib.createBrotliDecompress(),
      fs.createWriteStream(destPath)
    );
  } catch (error) {
    return operationFailed(error.message);
  }
}
