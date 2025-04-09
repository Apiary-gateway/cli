import { APIGatewayClient, CreateUsagePlanKeyCommand } from "@aws-sdk/client-api-gateway";

export async function addKeyToUsagePlan(usagePlanId: string, keyId: string) {
  try {
    const client = new APIGatewayClient();

    const command = new CreateUsagePlanKeyCommand({
      usagePlanId,
      keyId,
      keyType: "API_KEY",
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error('Error - could not add API key to usage plan: ', err);
  }
}