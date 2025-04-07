import { IOrderRepository } from "../../domain/order/repositories/IOrderRepository";
import { Order } from "../../domain/order/entities/Order";
import { OrderStatus } from "../../domain/order/value-objects/OrderStatus";

export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(orderData: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }): Promise<Order> {
    const order = new Order(orderData);
    return this.orderRepository.create(order);
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async listOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.getOrder(id);
    order.cancel();
    return this.orderRepository.update(order);
  }
}
