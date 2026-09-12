import os from 'node:os';

export const START_DIR = os.homedir();
export const COMMANDS = {
  /** Exit the program */
  EXIT: '.exit',
  /** Navigate up in the filesystem */
  UP: 'up',
  /** Change directory */
  CD: 'cd',
  /** List files and directories */
  LIST: 'ls',
  /** Concatenate and display file contents */
  CAT: 'cat',
  /** Add new file */
  ADD: 'add',
  /** Make directory */
  MKDIR: 'mkdir',
  /** Rename file */
  RENAME: 'rn',
  /** Copy file */
  COPY: 'cp',
  /** Move file */
  MOVE: 'mv',
  /** Remove file */
  REMOVE: 'rm',
  /** Show info about OS */
  OS: 'os',
  /** Calculate hash for file */
  HASH: 'hash',
  /** Compress file */
  COMPRESS: 'compress',
  /** Decompress file */
  DECOMPRESS: 'decompress',
};
