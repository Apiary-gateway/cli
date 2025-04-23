"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsagePlansUtil = getUsagePlansUtil;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const getGatewayId_1 = require("./getGatewayId");
async function getUsagePlansUtil() {
    const client = new client_api_gateway_1.APIGatewayClient();
    const gatewayId = await (0, getGatewayId_1.getGatewayId)(client);
    const command = new client_api_gateway_1.GetUsagePlansCommand({});
    const response = await client.send(command);
    const usagePlans = response.items?.filter(plan => {
        return plan.apiStages?.some(stage => stage.apiId === gatewayId);
    });
    return usagePlans ? usagePlans : [];
}
