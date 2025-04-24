import { getUsagePlansUtil } from "../utils/getUsagePlansUtil";

export async function getUsagePlans() {
  console.log('📜 Getting all usage plans for your Apiary LLM Gateway...');
  const plans = await getUsagePlansUtil();

  for (const plan of plans) {
    delete plan.apiStages;
  }

  console.log('🐝 Here are the current usage plans associated with your Apiary LLM Gateway: ');
  console.log(plans);
}