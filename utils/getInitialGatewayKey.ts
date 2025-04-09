import { APIGatewayClient, GetApiKeysCommand } from "@aws-sdk/client-api-gateway";

export async function getInitialGatewayKey() {
  const client = new APIGatewayClient();

  const response = await client.send(new GetApiKeysCommand({}));
  const key = response.items?.find(key => key.name === 'gateway-api-key');

  return key?.value;
}