import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const createDynamoDBClient = (): DynamoDBDocumentClient => {
  const isLocal = process.env.IS_LOCAL === 'true';
  
  // Use the DYNAMODB_ENDPOINT from env if provided; fallback to "http://dynamodb:8000"
  const endpoint = process.env.DYNAMODB_ENDPOINT || (isLocal ? "http://dynamodb:8000" : undefined);
  
  const client = new DynamoDBClient({
    ...(isLocal && endpoint ? {
      endpoint,
      region: process.env.AWS_REGION || "local-env",
      credentials: {
        accessKeyId: "mock",
        secretAccessKey: "mock"
      }
    } : {
      region: process.env.AWS_REGION || "us-east-1"
    })
  });

  return DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
    unmarshallOptions: { wrapNumbers: false }
  });
};
