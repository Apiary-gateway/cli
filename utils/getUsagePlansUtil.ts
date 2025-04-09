import { APIGatewayClient, GetUsagePlansCommand } from "@aws-sdk/client-api-gateway";
import { getGatewayId } from "./getGatewayId";

export async function getUsagePlansUtil() {
  const client = new APIGatewayClient();

  const gatewayId = await getGatewayId(client);

  const command = new GetUsagePlansCommand({});
  const response = await client.send(command);

  const usagePlans = response.items?.filter(plan => {
    return plan.apiStages?.some(stage => stage.apiId === gatewayId);
  })

  return usagePlans ? usagePlans : [];
}