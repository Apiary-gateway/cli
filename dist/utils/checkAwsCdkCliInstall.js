"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAwsCdkCliInstall = checkAwsCdkCliInstall;
const child_process_1 = require("child_process");
function checkAwsCdkCliInstall() {
    try {
        console.log('🔎 Checking if AWS CDK CLI is installed...');
        (0, child_process_1.execSync)('cdk --version', { stdio: 'inherit' });
    }
    catch (err) {
        throw new Error('AWS CDK CLI is not installed. Please see README for installation instructions and try again.');
    }
}
;
