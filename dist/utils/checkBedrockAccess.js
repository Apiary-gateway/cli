"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBedrockAccess = checkBedrockAccess;
const client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
const embeddingModelId = 'amazon.titan-embed-text-v2:0';
async function checkBedrockAccess() {
    const client = new client_bedrock_runtime_1.BedrockRuntimeClient({});
    try {
        console.log('🪨 Checking for required Bedrock model access...');
        await client.send(new client_bedrock_runtime_1.InvokeModelCommand({
            modelId: embeddingModelId,
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({ inputText: 'Test' }),
        }));
    }
    catch (err) {
        if (err instanceof client_bedrock_runtime_1.BedrockRuntimeServiceException && err.name === "AccessDeniedException") {
            throw new Error(`Your AWS account does not have the necessary permissions to`
                + `invoke Bedrock model '${embeddingModelId}'. Please see README for configuration instructions and try again.`);
        }
        else {
            console.error(`An error occurred while accessing Bedrock model '${embeddingModelId}'`);
            throw err;
        }
    }
}
