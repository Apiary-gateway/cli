"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUsagePlanUtil = editUsagePlanUtil;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function editUsagePlanUtil(usagePlanId, rateLimit, burstLimit, quotaPeriod, quotaLimit) {
    const client = new client_api_gateway_1.APIGatewayClient();
    const patchOperations = [
        {
            op: 'replace',
            path: '/throttle/rateLimit',
            value: rateLimit.toString(),
        },
        {
            op: 'replace',
            path: '/throttle/burstLimit',
            value: burstLimit.toString(),
        },
    ];
    if (quotaPeriod === 'NONE') {
        patchOperations.push({
            op: 'remove',
            path: '/quota',
        });
    }
    else {
        patchOperations.push({
            op: 'replace',
            path: '/quota/period',
            value: quotaPeriod,
        }, {
            op: 'replace',
            path: '/quota/limit',
            value: quotaLimit?.toString(),
        });
    }
    const input = {
        usagePlanId,
        patchOperations,
    };
    const command = new client_api_gateway_1.UpdateUsagePlanCommand(input);
    await client.send(command);
}
