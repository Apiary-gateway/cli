import { 
  APIGatewayClient, 
  CreateUsagePlanCommand,
  CreateUsagePlanCommandInput,
} from "@aws-sdk/client-api-gateway";
import { getGatewayId } from "./getGatewayId";

export async function createUsagePlanUtil(
  name: string,
  rateLimit: number,
  burstLimit?: number,
  quotaLimit?: number,
  quotaPeriod?: 'DAY' | 'WEEK' | 'MONTH',
) {
  try {
    const client = new APIGatewayClient();

    const gatewayId = await getGatewayId(client);

    const input: CreateUsagePlanCommandInput = {
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
    };

    const command = new CreateUsagePlanCommand(input);
  
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(`Error - could not create usage plan ${name}: `, err);
    throw err;
  }
}