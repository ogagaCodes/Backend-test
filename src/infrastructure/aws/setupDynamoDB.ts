import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || "orders-dev";
const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || "http://dynamodb:8000";

const client = new DynamoDBClient({
  endpoint: DYNAMODB_ENDPOINT,
  region: process.env.AWS_REGION || "local-env",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock"
  }
});

export const ensureTableExists = async () => {
  try {
    // Try to describe the table.
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`Table "${TABLE_NAME}" already exists.`);
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException") {
      console.log(`Table "${TABLE_NAME}" not found. Creating table...`);
      // Define table parameters. Adjust AttributeDefinitions and KeySchema as needed.
      const createCommand = new CreateTableCommand({
        TableName: TABLE_NAME,
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" }
        ],
        KeySchema: [
          { AttributeName: "id", KeyType: "HASH" }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      });
      await client.send(createCommand);
      console.log(`Table "${TABLE_NAME}" created successfully.`);
    } else {
      console.error("Error checking table:", err);
      throw err;
    }
  }
}
