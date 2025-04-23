"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyStack = destroyStack;
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
// TODO: change this path? align w/ create, at any rate
const stackPath = path_1.default.join(os_1.default.homedir(), 'aiGatewayStack', 'cdk-stack');
async function destroyStack() {
    const { confirmDestroy } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "confirmDestroy",
            message: "Are you sure you want to destroy your stack? This action is " +
                "permanent and cannot be undone!",
            choices: ["Yes", "No"],
        },
    ]);
    if (confirmDestroy === "No") {
        console.log('✖️ Destroy stack operation cancelled.');
        return;
    }
    try {
        console.log('🧨 Destroying CDK stack...');
        (0, child_process_1.execSync)('npx cdk destroy', { cwd: stackPath, stdio: 'inherit' });
    }
    catch (err) {
        console.error('❌ Failed to destroy stack: ', err);
        process.exit(1);
    }
}
