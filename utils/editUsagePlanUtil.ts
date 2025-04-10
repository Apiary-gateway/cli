import { 
  APIGatewayClient, 
  PatchOperation, 
  GetUsagePlanCommand,
  UpdateUsagePlanCommand 
} from "@aws-sdk/client-api-gateway";
import { getGatewayId } from "./getGatewayId";

export async function editUsagePlanUtil(
  usagePlanId: string, 
  rateLimit: number, 
  burstLimit: number, 
  quotaPeriod: 'DAY' | 'WEEK' | 'MONTH' | 'NONE', 
  quotaLimit: number | undefined
) {
  const client = new APIGatewayClient();

  const patchOperations: PatchOperation[] = [
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
  } else {
    patchOperations.push({
      op: 'replace',
      path: '/quota/period',
      value: quotaPeriod,
    },
    {
      op: 'replace',
      path: '/quota/limit',
      value: quotaLimit?.toString(),
    });
  }

  const input = {
    usagePlanId,
    patchOperations,
  }

  const command = new UpdateUsagePlanCommand(input);
  await client.send(command);
}