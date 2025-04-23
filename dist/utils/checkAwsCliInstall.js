"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAwsCliInstall = checkAwsCliInstall;
const child_process_1 = require("child_process");
function checkAwsCliInstall() {
    try {
        console.log('🔍 Checking if AWS CLI is installed...');
        (0, child_process_1.execSync)('aws --version', { stdio: 'inherit' });
    }
    catch (err) {
        throw new Error('AWS CLI is not installed. Please see README for installation instructions and try again.');
    }
}
;
