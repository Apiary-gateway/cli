"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStack = createStack;
const child_process_1 = require("child_process");
const updateAPIKeys_1 = require("./updateAPIKeys");
const getInitialGatewayKey_1 = require("../utils/getInitialGatewayKey");
const checkAwsCliInstall_1 = require("../utils/checkAwsCliInstall");
const checkAwsCdkCliInstall_1 = require("../utils/checkAwsCdkCliInstall");
const cdkBootstrap_1 = require("../utils/cdkBootstrap");
const checkBedrockAccess_1 = require("../utils/checkBedrockAccess");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cdkRepo = 'https://github.com/Apiary-gateway/gateway.git';
const targetDir = path_1.default.join(process.cwd(), 'apiary');
const frontendDir = path_1.default.join(targetDir, 'frontend-ui');
async function createStack() {
    try {
        if (!fs_1.default.existsSync(targetDir)) {
            console.log(`📩 Cloning CDK stack into ${targetDir}...`);
            (0, child_process_1.execSync)(`git clone ${cdkRepo} ${targetDir}`, { stdio: 'inherit' });
        }
        else {
            if (!fs_1.default.existsSync(path_1.default.join(targetDir, '.git'))) {
                throw new Error(`Can't clone CDK stack into existing directory ${targetDir} as it is not a valid Git repo`);
            }
            console.log(`🔄 Apiary repo already exists. Pulling latest changes in ${targetDir}...`);
            (0, child_process_1.execSync)(`git -C ${targetDir} pull`, { stdio: 'inherit' });
        }
        console.log('📦 Installing CDK stack dependencies...');
        (0, child_process_1.execSync)('npm install', { cwd: targetDir, stdio: 'inherit' });
        if (fs_1.default.existsSync(frontendDir)) {
            console.log('📦 Installing front-end dashboard dependencies...');
            (0, child_process_1.execSync)('npm install', { cwd: frontendDir, stdio: 'inherit' });
            console.log('🛠️ Building front-end dashboard...');
            (0, child_process_1.execSync)('npm run build', { cwd: frontendDir, stdio: 'inherit' });
        }
        (0, checkAwsCliInstall_1.checkAwsCliInstall)();
        (0, checkAwsCdkCliInstall_1.checkAwsCdkCliInstall)();
        (0, cdkBootstrap_1.cdkBootstrap)(targetDir);
        (0, checkBedrockAccess_1.checkBedrockAccess)();
        console.log('🚀 Deploying CDK stack...');
        (0, child_process_1.execSync)('npx cdk deploy --require-approval never', { cwd: targetDir, stdio: 'inherit' });
        console.log('🔐 Please enter your LLM provider API keys to be stored with Secrets Manager:');
        await (0, updateAPIKeys_1.updateAPIKeys)();
        console.log('✅ LLM provider API keys have been stored.');
        const key = await (0, getInitialGatewayKey_1.getInitialGatewayKey)();
        console.log('🗝️ You can use this API key to begin making requests with Apiary ', '(please save this key securely for future reference): ', key);
        console.log('🐝 Deployment complete!');
    }
    catch (err) {
        console.error('❌ Apiary deployment failed: ', err);
        process.exit(1);
    }
}
