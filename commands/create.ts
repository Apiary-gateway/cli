import { execSync } from 'child_process';
import { updateAPIKeys } from './updateAPIKeys';
import { getInitialGatewayKey } from '../utils/getInitialGatewayKey';
import { checkAwsCliInstall } from '../utils/checkAwsCliInstall';
import { checkAwsCdkCliInstall } from '../utils/checkAwsCdkCliInstall';
import { cdkBootstrap } from '../utils/cdkBootstrap';
import { checkBedrockAccess } from '../utils/checkBedrockAccess';
import fs from 'fs';
import path from 'path';
import { error } from 'console';

const cdkRepo = 'https://github.com/Sporkway/gateway.git';
const repoName = 'gateway';
const targetDir = path.join(process.cwd(), repoName);
const frontendDir = path.join(targetDir, 'frontend-ui');

export async function createStack() {
  try {
     if (!fs.existsSync(targetDir)) {
      console.log(`📩 Cloning CDK stack into ${targetDir}...`);
      execSync(`git clone ${cdkRepo} ${targetDir}`, { stdio: 'inherit' });
    } else {
      if (!fs.existsSync(path.join(targetDir, '.git'))) {
        throw new Error(`Can't clone CDK stack into existing directory ${targetDir} as it is not a valid Git repo`);
      }

      console.log(`🔄 Apiary repo already exists. Pulling latest changes in ${targetDir}...`);
      execSync(`git -C ${targetDir} pull`, { stdio: 'inherit' });
    }

    console.log('📦 Installing CDK stack dependencies...');
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

    if (fs.existsSync(frontendDir)) {
      console.log('📦 Installing front-end dashboard dependencies...');
      execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });

      console.log('🛠️ Building front-end dashboard...');
      execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
    }
    
    checkAwsCliInstall();
    checkAwsCdkCliInstall();
    cdkBootstrap(targetDir);
    checkBedrockAccess();
    
    console.log('🚀 Deploying CDK stack...');
    execSync(
      'npx cdk deploy --require-approval never', 
      { cwd: targetDir, stdio: 'inherit' }
    );
  
    console.log('🔐 Please enter your LLM provider API keys to be stored with Secrets Manager:');
    await updateAPIKeys();
    console.log('✅ LLM provider API keys have been stored.');
  
    const key = await getInitialGatewayKey();
    console.log(
      '🗝️ You can use this API key to begin making requests with Apiary ', 
      '(please save this key securely for future reference): ',
      key
    );
    
    console.log('🐝 Deployment complete!');
  } catch (err) {
    console.error('❌ Apiary deployment failed: ', err);
    process.exit(1);
  }
}
