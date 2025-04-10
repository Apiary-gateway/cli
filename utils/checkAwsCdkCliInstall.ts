import { execSync } from 'child_process';

export function checkAwsCdkCliInstall() {
  try {
    console.log('🔎 Checking if AWS CDK CLI is installed...');
    execSync('cdk --version', { stdio: 'inherit' });
  } catch (err) {
    throw new Error('AWS CDK CLI is not installed. Please see README for installation instructions and try again.')
  }
};
