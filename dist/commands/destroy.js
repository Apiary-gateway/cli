"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyStack = destroyStack;
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const targetDir = path_1.default.join(process.cwd(), 'apiary');
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
        if (!fs_1.default.existsSync(targetDir)) {
            throw new Error(`Could not find target directory ${targetDir}. Please ensure target directory with cloned Apiary stack exists.`);
        }
        console.log('🧨 Destroying Apiary CDK stack...');
        (0, child_process_1.execSync)('npx cdk destroy', { cwd: targetDir, stdio: 'inherit' });
    }
    catch (err) {
        console.error('❌ Failed to destroy stack: ', err);
        process.exit(1);
    }
}
