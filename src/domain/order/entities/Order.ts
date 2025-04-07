import { v4 as uuidv4 } from "uuid";
import { OrderStatus } from "../value-objects/OrderStatus";

export interface OrderItem {
  productId: string;
  quantity: number;
}

export class Order {
  readonly id: string;
  readonly userId: string;
  readonly items: OrderItem[];
  status: OrderStatus;
  readonly createdAt: Date;

  constructor(data: {
    userId: string;
    items: OrderItem[];
    status?: OrderStatus;
    id?: string;
    createdAt?: Date;
  }) {
    if (!data.userId) throw new Error("UserId is required");
    if (!data.items?.length) throw new Error("At least one item required");

    this.id = data.id || uuidv4();
    this.userId = data.userId;
    this.items = data.items;
    this.status = data.status || OrderStatus.CREATED;
    this.createdAt = data.createdAt || new Date();
  }

  cancel() {
    if (this.status === OrderStatus.CANCELLED) {
      throw new Error("Order already cancelled");
    }
    this.status = OrderStatus.CANCELLED;
  }
}
