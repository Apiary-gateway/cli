import { execSync } from 'child_process';
import { updateAPIKeys } from './updateAPIKeys';
import { getInitialGatewayKey } from '../utils/getInitialGatewayKey';
import { checkAwsCliInstall } from '../utils/checkAwsCliInstall';
import { checkAwsCdkCliInstall } from '../utils/checkAwsCdkCliInstall';
import { cdkBootstrap } from '../utils/cdkBootstrap';
import { checkBedrockAccess } from '../utils/checkBedrockAccess';
import fs from 'fs';
import os from 'os';
import path from 'path';

const stackPath = path.join(os.homedir(), 'aiGatewayStack', 'cdk-stack');
const cdkRepo = 'https://github.com/Sporkway/gateway.git';

export async function createStack() {
  try {
    console.log(`📩 Cloning CDK stack into directory: ${stackPath}`);
    if (!fs.existsSync(stackPath)) {
      fs.mkdirSync(stackPath, { recursive: true });
      execSync(`git clone ${cdkRepo} ${stackPath}`, { stdio: 'inherit' });
    } else {
      execSync(`git -C ${stackPath} pull`, { stdio: 'inherit' });
    }

    console.log('📦 Installing dependencies...');
    execSync('npm install', { cwd: stackPath, stdio: 'inherit' });
    
    checkAwsCliInstall();
    checkAwsCdkCliInstall();
    cdkBootstrap(stackPath);
    checkBedrockAccess();
    
    console.log('🚀 Deploying CDK stack...');
    execSync(
      'npx cdk deploy --require-approval never', 
      { cwd: stackPath, stdio: 'inherit' }
    );
  
    console.log('🔐 Please enter your LLM provider API keys to be stored with Secrets Manager:');
    await updateAPIKeys();
    console.log('✅ LLM provider API keys have been stored.');
  
    const key = await getInitialGatewayKey();
    console.log(
      '🗝️ You can use this API key to begin making requests with AI Gateway ', 
      '(please save this key securely for future reference): ',
      key
    );
    
    console.log('🌠 Deployment complete!');
  } catch (err) {
    console.error('❌ AI Gateway stack deployment failed: ', err);
    process.exit(1);
  }
}
