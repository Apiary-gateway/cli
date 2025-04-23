import inquirer from "inquirer";
import { SecretsManagerClient, UpdateSecretCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient();
const SECRET_NAME = 'llm-provider-api-keys';

export async function deleteAPIKeys() {
  const { confirmDelete } = await inquirer.prompt([
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
    const command = new UpdateSecretCommand({
      SecretId: SECRET_NAME,
      SecretString: '{"ANTHROPIC_API_KEY": "", "GEMINI_API_KEY": "", "OPENAI_API_KEY": ""}',
    });

    await client.send(command);
    console.log('🐝 Deleted LLM provider API keys');
  } catch (err) {
    console.error(`❌ Failed to delete LLM provider API keys: `, err);
  }

}