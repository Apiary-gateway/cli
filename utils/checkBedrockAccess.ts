import {
  BedrockRuntimeClient,
  BedrockRuntimeServiceException,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const embeddingModelId = 'amazon.titan-embed-text-v2:0';

export async function checkBedrockAccess() {
  const client = new BedrockRuntimeClient({});

  try {
    console.log('🪨 Checking for required Bedrock model access...');
    
    await client.send(
      new InvokeModelCommand({
        modelId: embeddingModelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({ inputText: 'Test' }),
      })
    );
  } catch (err: unknown) {
    if (err instanceof BedrockRuntimeServiceException && err.name === "AccessDeniedException") {
      throw new Error(`Your AWS account does not have the necessary permissions to` 
        + `invoke Bedrock model '${embeddingModelId}'. Please see README for configuration instructions and try again.`);
    } else {
      console.error(`An error occurred while accessing Bedrock model '${embeddingModelId}'`);
      throw err;
    }
  }
}
