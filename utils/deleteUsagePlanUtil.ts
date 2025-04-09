import { 
  APIGatewayClient, 
  DeleteUsagePlanCommand,
  DeleteApiKeyCommand,
  DeleteUsagePlanKeyCommand,
  GetUsagePlanKeysCommand,
  UpdateUsagePlanCommand,
  GetUsagePlanCommand,
  PatchOperation, 
} from "@aws-sdk/client-api-gateway";

export async function deleteUsagePlanUtil(usagePlanId: string) {
  try {
    const client = new APIGatewayClient();

    const apiKeysCommand = new GetUsagePlanKeysCommand({ usagePlanId });
    const apiKeysResponse = await client.send(apiKeysCommand);
    if (apiKeysResponse.items) {
      for (const key of apiKeysResponse.items) {
        await client.send(new DeleteUsagePlanKeyCommand({
          keyId: key.id,
          usagePlanId,
        }));
        await client.send(new DeleteApiKeyCommand({ apiKey: key.id }));
      }
    }

    const plan = await client.send(new GetUsagePlanCommand({ usagePlanId }));
    const apiStages = plan.apiStages || [];

    if (apiStages.length > 0) {
      const patchOperations: PatchOperation[] = apiStages.map(stage => ({
        op: 'remove',
        path: `/apiStages`,
        value: `${stage.apiId}:${stage.stage}`
      }));

      const removeStageCommand = new UpdateUsagePlanCommand({
        usagePlanId,
        patchOperations,
      });
      await client.send(removeStageCommand);
    }

    await client.send(new DeleteUsagePlanCommand({ usagePlanId }));
  } catch (err) {
    console.error(`Error - could not delete usage plan with ID ${usagePlanId}: `, err);
    throw err;
  }
}