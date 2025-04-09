import inquirer from 'inquirer';
import { createGatewayApiKey } from '../utils/createGatewayApiKey';
import { createUsagePlan } from '../utils/createUsagePlan';
import { addKeyToUsagePlan } from '../utils/addKeyToUsagePlan';

export async function createUsagePlanWithKey() {
  const apiKeySpecs = await inquirer.prompt([
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
  
  const apiKeyResponse = await createGatewayApiKey(apiKeyName, apiKeyDescription);
  const apiKeyId = apiKeyResponse.id;
  
  const usagePlanSpecs = await inquirer.prompt([
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
      message: 'Enter a burst limit (optional): ',
    },
    {
      type: 'list',
      name: 'quotaPeriod',
      message: 'Choose a quota period (optional): ',
      choices: ['DAY', 'WEEK', 'MONTH', 'NONE'],
    },
    {
      type: 'number',
      name: 'quotaLimit',
      message: 'Enter a quota limit (optional): ',
    },
  ]);

  let { usagePlanName, rateLimit, burstLimit, quotaPeriod, quotaLimit } = usagePlanSpecs;
  if (quotaPeriod === 'NONE') quotaPeriod = undefined;
  const usagePlanResponse = await createUsagePlan(
    usagePlanName, rateLimit, burstLimit, quotaLimit, quotaPeriod 
  );
  const usagePlanId = usagePlanResponse.id;

  try {
    if (!apiKeyId) {
      throw new Error("Couldn't add API key to usage plan - missing API key ID");
    } else if (!usagePlanId) {
      throw new Error("Couldn't add API key to usage plan - missing usage plan ID");
    } else {
      await addKeyToUsagePlan(usagePlanId, apiKeyId);
      console.log(
        `🌠 Created usage plan with API key: ${apiKeyResponse.value}`,
        '\n🗝️ Please save this API key for future reference.'
      );
    }
  } catch (err) {
    console.error(`❌ Failed to update LLM provider API keys: `, err);
  }
}
