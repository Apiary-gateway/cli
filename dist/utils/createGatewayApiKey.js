"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGatewayApiKey = createGatewayApiKey;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function createGatewayApiKey(name, description) {
    try {
        const client = new client_api_gateway_1.APIGatewayClient();
        const command = new client_api_gateway_1.CreateApiKeyCommand({
            name,
            description,
            enabled: true,
        });
        const response = await client.send(command);
        return response;
    }
    catch (err) {
        console.error(`Error - could not create API key '${name}': `, err);
        throw err;
    }
}
