"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsagePlan = deleteUsagePlan;
const inquirer_1 = __importDefault(require("inquirer"));
const deleteUsagePlanUtil_1 = require("../utils/deleteUsagePlanUtil");
async function deleteUsagePlan() {
    const { usagePlanId, confirmDelete } = await inquirer_1.default.prompt([
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
        await (0, deleteUsagePlanUtil_1.deleteUsagePlanUtil)(usagePlanId);
        console.log(`🐝 Successfully deleted usage plan with ID '${usagePlanId}'`);
    }
    catch (err) {
        console.error('❌ Failed to delete usage plan: ', err);
    }
}
