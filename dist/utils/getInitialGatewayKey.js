"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialGatewayKey = getInitialGatewayKey;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function getInitialGatewayKey() {
    const client = new client_api_gateway_1.APIGatewayClient();
    const response = await client.send(new client_api_gateway_1.GetApiKeysCommand({
        includeValues: true,
    }));
    const key = response.items?.find(key => key.name === 'gateway-api-key');
    return key?.value;
}
