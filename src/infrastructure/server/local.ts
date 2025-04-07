import { createExpressServer } from "./express";
import { createDynamoDBClient } from "../aws/dynamodb-client";
import { DynamoDBOrderRepository } from "../aws/dynamodb/DynamoDBOrderRepository";
import { ensureTableExists } from "../aws/setupDynamoDB";

const PORT = process.env.PORT || 3040;
const IS_LOCAL = process.env.IS_LOCAL === "true";

(async () => {
  const ddbClient = createDynamoDBClient();
  const orderRepository = new DynamoDBOrderRepository(
    ddbClient,
    process.env.ORDERS_TABLE || "orders-dev"
  );
  const app = createExpressServer(
    ddbClient,
    process.env.ORDERS_TABLE || "orders-dev",
    orderRepository
  );
  // Ensure the table exists before starting the server.
  try {
    await ensureTableExists();
    console.log(`DynamoDB Table: ${process.env.ORDERS_TABLE}`);
  } catch (error) {
    console.error("Error ensuring DynamoDB table exists:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server running ${IS_LOCAL ? "locally" : ""} on port ${PORT}`);
    console.log(`DynamoDB Table: ${process.env.ORDERS_TABLE}`);
  });
})();
