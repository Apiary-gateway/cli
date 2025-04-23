"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAPIKeys = updateAPIKeys;
const inquirer_1 = __importDefault(require("inquirer"));
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const client = new client_secrets_manager_1.SecretsManagerClient();
const SECRET_NAME = 'llm-provider-api-keys';
// check how defaults show up
async function updateAPIKeys() {
    const apiKeys = await inquirer_1.default.prompt([
        {
            type: 'password',
            name: 'openaiAPIKey',
            message: 'Enter your OpenAI API key (optional): ',
            mask: '*',
            default: 'empty-key',
        },
        {
            type: 'password',
            name: 'anthropicAPIKey',
            message: 'Enter your Anthropic API key (optional): ',
            mask: '*',
            default: 'empty-key',
        },
        {
            type: 'password',
            name: 'geminiAPIKey',
            message: 'Enter your Gemini API key (optional): ',
            mask: '*',
            default: 'empty-key',
        },
    ]);
    const { openaiAPIKey, anthropicAPIKey, geminiAPIKey } = apiKeys;
    try {
        const command = new client_secrets_manager_1.UpdateSecretCommand({
            SecretId: SECRET_NAME,
            SecretString: `{"ANTHROPIC_API_KEY": "${anthropicAPIKey}", "GEMINI_API_KEY": "${geminiAPIKey}", "OPENAI_API_KEY": "${openaiAPIKey}"}`,
        });
        await client.send(command);
        console.log('🌠 Updated LLM provider API keys');
    }
    catch (err) {
        console.error(`❌ Failed to update LLM provider API keys: `, err);
    }
}
