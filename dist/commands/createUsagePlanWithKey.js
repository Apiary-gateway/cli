"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsagePlanWithKey = createUsagePlanWithKey;
const inquirer_1 = __importDefault(require("inquirer"));
const createGatewayApiKey_1 = require("../utils/createGatewayApiKey");
const createUsagePlanUtil_1 = require("../utils/createUsagePlanUtil");
const addKeyToUsagePlan_1 = require("../utils/addKeyToUsagePlan");
async function createUsagePlanWithKey() {
    const apiKeySpecs = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'apiKeyName',
            message: 'Enter a name for your API key (required): '
        },
        {
            type: 'input',
            name: 'apiKeyDescription',
            message: 'Enter a description for your API key (optional): ',
        },
    ]);
    const { apiKeyName, apiKeyDescription } = apiKeySpecs;
    const apiKeyResponse = await (0, createGatewayApiKey_1.createGatewayApiKey)(apiKeyName, apiKeyDescription);
    const apiKeyId = apiKeyResponse.id;
    const usagePlanSpecs = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'usagePlanName',
            message: 'Enter a name for your usage plan (required): ',
        },
        {
            type: 'number',
            name: 'rateLimit',
            message: 'Enter a rate limit (required - requests per second): ',
        },
        {
            type: 'number',
            name: 'burstLimit',
            message: 'Enter a burst limit (required): ',
        },
        {
            type: 'list',
            name: 'quotaPeriod',
            message: 'Choose a quota period: ',
            choices: ['DAY', 'WEEK', 'MONTH', 'NONE'],
        },
        {
            type: 'number',
            name: 'quotaLimit',
            message: 'Enter a quota limit (required): ',
            when: (answers) => answers.quotaPeriod !== 'NONE',
        },
    ]);
    let { usagePlanName, rateLimit, burstLimit, quotaPeriod, quotaLimit } = usagePlanSpecs;
    if (quotaPeriod === 'NONE')
        quotaPeriod = undefined;
    const usagePlanResponse = await (0, createUsagePlanUtil_1.createUsagePlanUtil)(usagePlanName, rateLimit, burstLimit, quotaLimit, quotaPeriod);
    const usagePlanId = usagePlanResponse.id;
    try {
        if (!apiKeyId) {
            throw new Error("Couldn't add API key to usage plan - missing API key ID");
        }
        else if (!usagePlanId) {
            throw new Error("Couldn't add API key to usage plan - missing usage plan ID");
        }
        else {
            await (0, addKeyToUsagePlan_1.addKeyToUsagePlan)(usagePlanId, apiKeyId);
            console.log(`🌠 Created usage plan with API key: ${apiKeyResponse.value}`, '\n🗝️ Please save this API key securely for future reference.');
        }
    }
    catch (err) {
        console.error(`❌ Failed to create usage plan: `, err);
    }
}
