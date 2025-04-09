import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { updateAPIKeys } from '../utils/updateAPIKeys';

const stackPath = path.join(os.homedir(), 'aiGatewayStack', 'cdk-stack');
const cdkRepo = 'https://github.com/Sporkway/gateway.git';

export async function createStack() {
  // TODO - add checks that they have AWS CLI and CDK CLI(?) set up
  // TODO - bootstrap stack if needed
  // TODO - make stackPath a hidden dir? and/or let user pass in a custom path?

  console.log(`📩 Cloning CDK stack into directory: ${stackPath}`);
  if (!fs.existsSync(stackPath)) {
    fs.mkdirSync(stackPath, { recursive: true });
    execSync(`git clone ${cdkRepo} ${stackPath}`, { stdio: 'inherit' });
  } else {
    execSync(`git -C ${stackPath} pull`, { stdio: 'inherit' });
  }

  console.log('📦 Installing dependencies...');
  execSync('npm install', { cwd: stackPath, stdio: 'inherit' });

  console.log('🚀 Deploying CDK stack...');
  execSync('npx cdk deploy', { cwd: stackPath, stdio: 'inherit' });

  console.log('🔐 Please enter your LLM provider API keys to be stored with Secrets Manager:');
  await updateAPIKeys();

  console.log('🌠 Deployment complete!');
}
