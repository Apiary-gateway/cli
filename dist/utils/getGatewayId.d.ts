import { APIGatewayClient } from "@aws-sdk/client-api-gateway";
export declare function getGatewayId(client: APIGatewayClient): Promise<string>;
