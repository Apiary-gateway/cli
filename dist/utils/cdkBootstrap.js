"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdkBootstrap = cdkBootstrap;
const child_process_1 = require("child_process");
function cdkBootstrap(directory) {
    try {
        console.log('🥾 Bootstrapping initial CDK resources...');
        (0, child_process_1.execSync)('cdk bootstrap', { cwd: directory, stdio: 'inherit' });
    }
    catch (err) {
        console.error('❌ An error occurred while bootstrapping CDK: ');
        throw err;
    }
}
;
