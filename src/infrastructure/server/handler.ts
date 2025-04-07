import { APIGatewayProxyHandler } from "aws-lambda";
import { createExpressServer } from "./express";
import { DynamoDBOrderRepository } from "../aws/dynamodb/DynamoDBOrderRepository";
import { createDynamoDBClient } from "../aws/dynamodb-client";
import serverlessExpress from "@vendia/serverless-express";

let serverlessExpressInstance: any;

// Initialize dependencies
const ddbClient = createDynamoDBClient();
const orderRepository = new DynamoDBOrderRepository(
  ddbClient,
  process.env.ORDERS_TABLE!
);
const app = createExpressServer(ddbClient, process.env.ORDERS_TABLE || "orders-dev", orderRepository);

async function bootstrap() {
  if (!serverlessExpressInstance) {
    serverlessExpressInstance = serverlessExpress({ app });
  }
  return serverlessExpressInstance;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};