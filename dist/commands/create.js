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
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const stackPath = path_1.default.join(os_1.default.homedir(), 'aiGatewayStack', 'cdk-stack');
const cdkRepo = 'https://github.com/Sporkway/gateway.git';
async function createStack() {
    try {
        console.log(`📩 Cloning CDK stack into directory: ${stackPath}`);
        if (!fs_1.default.existsSync(stackPath)) {
            fs_1.default.mkdirSync(stackPath, { recursive: true });
            (0, child_process_1.execSync)(`git clone ${cdkRepo} ${stackPath}`, { stdio: 'inherit' });
        }
        else {
            (0, child_process_1.execSync)(`git -C ${stackPath} pull`, { stdio: 'inherit' });
        }
        console.log('📦 Installing dependencies...');
        (0, child_process_1.execSync)('npm install', { cwd: stackPath, stdio: 'inherit' });
        (0, checkAwsCliInstall_1.checkAwsCliInstall)();
        (0, checkAwsCdkCliInstall_1.checkAwsCdkCliInstall)();
        (0, cdkBootstrap_1.cdkBootstrap)(stackPath);
        (0, checkBedrockAccess_1.checkBedrockAccess)();
        console.log('🚀 Deploying CDK stack...');
        (0, child_process_1.execSync)('npx cdk deploy --require-approval never', { cwd: stackPath, stdio: 'inherit' });
        console.log('🔐 Please enter your LLM provider API keys to be stored with Secrets Manager:');
        await (0, updateAPIKeys_1.updateAPIKeys)();
        console.log('✅ LLM provider API keys have been stored.');
        const key = await (0, getInitialGatewayKey_1.getInitialGatewayKey)();
        console.log('🗝️ You can use this API key to begin making requests with AI Gateway ', '(please save this key securely for future reference): ', key);
        console.log('🌠 Deployment complete!');
    }
    catch (err) {
        console.error('❌ AI Gateway stack deployment failed: ', err);
        process.exit(1);
    }
}
