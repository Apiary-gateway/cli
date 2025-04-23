"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsagePlanUtil = deleteUsagePlanUtil;
const client_api_gateway_1 = require("@aws-sdk/client-api-gateway");
async function deleteUsagePlanUtil(usagePlanId) {
    try {
        const client = new client_api_gateway_1.APIGatewayClient();
        const apiKeysCommand = new client_api_gateway_1.GetUsagePlanKeysCommand({ usagePlanId });
        const apiKeysResponse = await client.send(apiKeysCommand);
        if (apiKeysResponse.items) {
            for (const key of apiKeysResponse.items) {
                await client.send(new client_api_gateway_1.DeleteUsagePlanKeyCommand({
                    keyId: key.id,
                    usagePlanId,
                }));
                await client.send(new client_api_gateway_1.DeleteApiKeyCommand({ apiKey: key.id }));
            }
        }
        const plan = await client.send(new client_api_gateway_1.GetUsagePlanCommand({ usagePlanId }));
        const apiStages = plan.apiStages || [];
        if (apiStages.length > 0) {
            const patchOperations = apiStages.map(stage => ({
                op: 'remove',
                path: `/apiStages`,
                value: `${stage.apiId}:${stage.stage}`
            }));
            const removeStageCommand = new client_api_gateway_1.UpdateUsagePlanCommand({
                usagePlanId,
                patchOperations,
            });
            await client.send(removeStageCommand);
        }
        await client.send(new client_api_gateway_1.DeleteUsagePlanCommand({ usagePlanId }));
    }
    catch (err) {
        console.error(`Error - could not delete usage plan with ID ${usagePlanId}: `, err);
        throw err;
    }
}
