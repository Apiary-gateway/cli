"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAPIKeys = deleteAPIKeys;
const inquirer_1 = __importDefault(require("inquirer"));
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const client = new client_secrets_manager_1.SecretsManagerClient();
const SECRET_NAME = 'llm-provider-api-keys';
async function deleteAPIKeys() {
    const { confirmDelete } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'confirmDelete',
            message: 'Are you sure you want to delete your stored keys? This will '
                + 'remove all of your stored LLM provider API keys from Secrets Manager.',
            choices: ['Yes', 'No']
        },
    ]);
    if (confirmDelete === 'No') {
        console.log('✖️ Delete LLM provider API keys operation cancelled.');
        return;
    }
    try {
        const command = new client_secrets_manager_1.UpdateSecretCommand({
            SecretId: SECRET_NAME,
            SecretString: '{"ANTHROPIC_API_KEY": "", "GEMINI_API_KEY": "", "OPENAI_API_KEY": ""}',
        });
        await client.send(command);
        console.log('🌠 Deleted LLM provider API keys');
    }
    catch (err) {
        console.error(`❌ Failed to delete LLM provider API keys: `, err);
    }
}
