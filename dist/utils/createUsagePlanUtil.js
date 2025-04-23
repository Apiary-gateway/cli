"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsagePlanUtil = createUsagePlanUtil;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
const getGatewayId_1 = require("./getGatewayId");
async function createUsagePlanUtil(name, rateLimit, burstLimit, quotaLimit, quotaPeriod) {
    try {
        const client = new client_api_gateway_1.APIGatewayClient();
        const gatewayId = await (0, getGatewayId_1.getGatewayId)(client);
        const input = {
            name,
            apiStages: [{
                    apiId: `${gatewayId}`,
                    stage: 'dev',
                }],
            throttle: {
                burstLimit,
                rateLimit,
            },
        };
        if (quotaPeriod) {
            input.quota = {
                limit: quotaLimit,
                period: quotaPeriod,
            };
        }
        ;
        const command = new client_api_gateway_1.CreateUsagePlanCommand(input);
        const response = await client.send(command);
        return response;
    }
    catch (err) {
        console.error(`Error - could not create usage plan ${name}: `, err);
        throw err;
    }
}
