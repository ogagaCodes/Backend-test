import { 
    DynamoDBDocumentClient, 
    PutCommand, 
    GetCommand, 
    ScanCommand, 
    DeleteCommand 
  } from "@aws-sdk/lib-dynamodb";
  import { IOrderRepository } from "../../../domain/order/repositories/IOrderRepository";
  import { Order, OrderItem } from "../../../domain/order/entities/Order";
  import { OrderStatus } from "../../../domain/order/value-objects/OrderStatus";
  
  interface DynamoDBOrder {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatus;
    createdAt: string;
  }
  
  export class DynamoDBOrderRepository implements IOrderRepository {
    constructor(
      private readonly ddbClient: DynamoDBDocumentClient,
      private readonly tableName: string = process.env.ORDERS_TABLE || "orders-dev"
    ) {}
  
    private toDomain(raw: DynamoDBOrder): Order {
      return new Order({
        ...raw,
        createdAt: new Date(raw.createdAt),
      });
    }
  
    private toPersistence(order: Order): DynamoDBOrder {
      return {
        id: order.id,
        userId: order.userId,
        items: order.items,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
      };
    }
  
    async create(order: Order): Promise<Order> {
      const persistenceOrder = this.toPersistence(order);
      await this.ddbClient.send(new PutCommand({
        TableName: this.tableName || "orders-dev",
        Item: persistenceOrder
      }));
      return order;
    }
  
    async findById(id: string): Promise<Order | null> {
      const result = await this.ddbClient.send(new GetCommand({
        TableName: this.tableName || "orders-dev",
        Key: { id }
      }));
      
      return result.Item ? this.toDomain(result.Item as DynamoDBOrder) : null;
    }
  
    async findAll(): Promise<Order[]> {
      const result = await this.ddbClient.send(new ScanCommand({
        TableName: this.tableName || "orders-dev"
      }));
      
      return result.Items 
        ? (result.Items as DynamoDBOrder[]).map(this.toDomain) 
        : [];
    }
  
    async update(order: Order): Promise<Order> {
      const persistenceOrder = this.toPersistence(order);
      await this.ddbClient.send(new PutCommand({
        TableName: this.tableName || "orders-dev",
        Item: persistenceOrder
      }));
      return order;
    }
  
    async delete(id: string): Promise<boolean> {
      await this.ddbClient.send(new DeleteCommand({
        TableName: this.tableName || "orders-dev",
        Key: { id }
      }));
      return true;
    }
  }