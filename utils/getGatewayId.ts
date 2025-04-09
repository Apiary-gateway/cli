import { 
  APIGatewayClient, 
  GetRestApisCommand, 
} from "@aws-sdk/client-api-gateway";

export async function getGatewayId(client: APIGatewayClient) {
  const command = new GetRestApisCommand({});
  const response = await client.send(command);
  const gateway = response.items?.find(gateway => gateway.name === 'AI Gateway API');
  
  if (!gateway || !gateway.id) {
    throw new Error('Could not find ID for API Gateway "AI Gateway API"');
  }

  return gateway.id;
}