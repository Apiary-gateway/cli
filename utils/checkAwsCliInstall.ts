import { execSync } from 'child_process';

export function checkAwsCliInstall() {
  try {
    console.log('🔍 Checking if AWS CLI is installed...');
    execSync('aws --version', { stdio: 'inherit' });
  } catch (err) {
    throw new Error('AWS CLI is not installed. Please see README for installation instructions and try again.')
  }
};
