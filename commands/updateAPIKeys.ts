import inquirer from 'inquirer';
import { SecretsManagerClient, UpdateSecretCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient();
const SECRET_NAME = 'llm-provider-api-keys';

export async function updateAPIKeys() {
  const apiKeys = await inquirer.prompt([
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
    const command = new UpdateSecretCommand({
      SecretId: SECRET_NAME,
      SecretString: `{"ANTHROPIC_API_KEY": "${anthropicAPIKey}", "GEMINI_API_KEY": "${geminiAPIKey}", "OPENAI_API_KEY": "${openaiAPIKey}"}`,
    });

    await client.send(command);
    console.log('🐝 Updated LLM provider API keys');
  } catch (err) {
    console.error(`❌ Failed to update LLM provider API keys: `, err);
  }
}
