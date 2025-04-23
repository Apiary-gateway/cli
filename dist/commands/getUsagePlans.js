"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsagePlans = getUsagePlans;
const getUsagePlansUtil_1 = require("../utils/getUsagePlansUtil");
async function getUsagePlans() {
    console.log('📜 Getting all usage plans for AI Gateway...');
    const plans = await (0, getUsagePlansUtil_1.getUsagePlansUtil)();
    for (const plan of plans) {
        delete plan.apiStages;
    }
    console.log('☑️ Here are the current usage plans associated with your AI Gateway: ');
    console.log(plans);
}
