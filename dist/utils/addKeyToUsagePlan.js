"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeyToUsagePlan = addKeyToUsagePlan;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function addKeyToUsagePlan(usagePlanId, keyId) {
    try {
        const client = new client_api_gateway_1.APIGatewayClient();
        const command = new client_api_gateway_1.CreateUsagePlanKeyCommand({
            usagePlanId,
            keyId,
            keyType: "API_KEY",
        });
        const response = await client.send(command);
        return response;
    }
    catch (err) {
        console.error('Error - could not add API key to usage plan: ', err);
    }
}
