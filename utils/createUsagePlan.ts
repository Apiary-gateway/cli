import { 
  APIGatewayClient, 
  CreateUsagePlanCommand,
  GetRestApisCommand, 
} from "@aws-sdk/client-api-gateway";

async function getGatewayId(client: APIGatewayClient) {
  const command = new GetRestApisCommand({});
  const response = await client.send(command);
  const gateway = response.items?.find(gateway => gateway.name === 'AI Gateway API');
  return gateway ? gateway.id : null;
}

export async function createUsagePlan(
  name: string,
  rateLimit: number,
  burstLimit?: number,
  quotaLimit?: number,
  quotaPeriod?: 'DAY' | 'WEEK' | 'MONTH',
) {
  try {
    const client = new APIGatewayClient();

    const gatewayId = await getGatewayId(client);
    if (!getGatewayId) {
      throw new Error('Could not find ID for API Gateway "AI Gateway API"');
    }

    const input = quotaPeriod ? 
      {
        name,
        apiStages: [{
          apiId: `${gatewayId}`,
          stage: 'dev',
        }],
        throttle: {
          burstLimit,
          rateLimit,
        },
        quota: { 
          limit: quotaLimit,
          period: quotaPeriod,
        },
      }
      :
      {
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

    const command = new CreateUsagePlanCommand(input);
  
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(`Error - could not create usage plan ${name}: `, err);
    throw err;
  }
}