import os from 'node:os';
import { invalidInput } from './errors.js';

const OS_PARAM = {
  EOL: '--EOL',
  CPUS: '--cpus',
  HOMEDIR: '--homedir',
  USERNAME: '--username',
  ARCH: '--architecture',
};

/**
 * Displays OS information based on param
 * @param {string} osParam
 */
export function displayOsInfo(osParam) {
  if (osParam === OS_PARAM.EOL) {
    console.log(JSON.stringify(os.EOL));
    return;
  }
  if (osParam === OS_PARAM.CPUS) {
    const cpus = os.cpus();
    console.log({
      cpusAmount: cpus.length,
      details: cpus.map((cpu) => ({ model: cpu.model, rate: cpu.speed })),
    });
    return;
  }
  if (osParam === OS_PARAM.HOMEDIR) {
    console.log(os.homedir());
    return;
  }
  if (osParam === OS_PARAM.USERNAME) {
    console.log(os.userInfo().username);
    return;
  }
  if (osParam === OS_PARAM.ARCH) {
    console.log(os.arch());
    return;
  }
  return invalidInput('OS param not found');
}
