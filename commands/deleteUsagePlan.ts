import inquirer from "inquirer";
import { deleteUsagePlanUtil } from "../utils/deleteUsagePlanUtil";

export async function deleteUsagePlan() {
  const { usagePlanId, confirmDelete } = await inquirer.prompt([
    {
      type: "input",
      name: "usagePlanId",
      message: "Please enter the ID for the usage plan to delete: ",
    },
    {
      type: "list",
      name: "confirmDelete",
      message: "Are you sure you want to delete this usage plan? This will also"
      + " delete the API key associated with this plan. This action is permanent"
      + " and cannot be undone!",
      choices: ["Yes", "No"],
    },
  ]);

  if (confirmDelete === 'No') {
    console.log('✖️ Delete usage plan operation cancelled.');
    return;
  }

  try {
    await deleteUsagePlanUtil(usagePlanId);
    console.log(`✅ Successfully deleted usage plan with ID '${usagePlanId}'`);
  } catch (err) {
    console.error('❌ Failed to delete usage plan: ', err);
  } 
}