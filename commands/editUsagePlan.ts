import inquirer from 'inquirer';
import { editUsagePlanUtil } from '../utils/editUsagePlanUtil';

export async function editUsagePlan() {
  const usagePlanSpecs = await inquirer.prompt([
    {
      type: 'input',
      name: 'usagePlanId',
      message: 'Please enter the ID for the usage plan to update: ',
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

  let { usagePlanId, rateLimit, burstLimit, quotaPeriod, quotaLimit } = usagePlanSpecs;
  
  try {
    await editUsagePlanUtil(usagePlanId, rateLimit, burstLimit, quotaPeriod, quotaLimit);
    console.log('🌠 Successfully updated usage plan');
  } catch (err) {
    console.error('❌ Failed to update usage plan: ', err);
  }
}
