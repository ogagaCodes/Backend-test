import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from "body-parser";
import { errorHandler } from "../../interfaces/middleware/errorMiddleware";
import { createOrderRoutes } from "../../interfaces/routes/orderRoutes";
import { OrderController } from "../../interfaces/controllers/OrderController";
import { OrderService } from "../../application/services/OrderService";
import { IOrderRepository } from "../../domain/order/repositories/IOrderRepository";
import { DynamoDBOrderRepository } from "../aws/dynamodb/DynamoDBOrderRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export function createExpressServer(
dynamoDBClient: unknown, p0: string, orderRepository: IOrderRepository): express.Application {
  const app = express();

  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.get("/", (req, res) => {
    res.send("Order Service API")
  })
  app.use("/orders", createOrderRoutes(orderController));

  // Error handling
  app.use(errorHandler);

  return app;
}
