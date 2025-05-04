import crypto from 'node:crypto';
import fs from 'node:fs';
import { invalidInput, operationFailed } from './errors.js';

function hashFile(filePath, algorithm = 'sha256') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      const digest = hash.digest('hex');
      resolve(digest);
    });
    stream.on('error', (err) => reject(err));
  });
}

/**
 * Displays hash of the file
 * @param {PathLike} filePath
 */
export async function displayFileHash(filePath) {
  if (!filePath) return invalidInput('filePath is not defined');

  try {
    const hash = await hashFile(filePath);
    console.log(hash);
  } catch (error) {
    return operationFailed(error.message);
  }
}
