import { APIGatewayClient, CreateApiKeyCommand } from "@aws-sdk/client-api-gateway";

export async function createGatewayApiKey(name: string, description?: string) {
  try {
    const client = new APIGatewayClient();

    const command = new CreateApiKeyCommand({
      name,
      description,
      enabled: true,
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(`Error - could not create API key '${name}': `, err);
    throw err;
  }
}