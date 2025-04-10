import { execSync } from 'child_process';

export function cdkBootstrap(directory: string) {
  try {
    console.log('🥾 Bootstrapping initial CDK resources...');
    execSync('cdk bootstrap', { cwd: directory, stdio: 'inherit' });
  } catch (err) {
    console.error('❌ An error occurred while bootstrapping CDK: ');
    throw err;
  }
};
