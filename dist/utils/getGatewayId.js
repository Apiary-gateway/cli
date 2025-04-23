"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGatewayId = getGatewayId;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function getGatewayId(client) {
    const command = new client_api_gateway_1.GetRestApisCommand({});
    const response = await client.send(command);
    const gateway = response.items?.find(gateway => gateway.name === 'AI Gateway API');
    if (!gateway || !gateway.id) {
        throw new Error('Could not find ID for API Gateway "AI Gateway API"');
    }
    return gateway.id;
}
