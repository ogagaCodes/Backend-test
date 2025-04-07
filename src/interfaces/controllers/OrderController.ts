import { Request, Response, NextFunction } from "express";
import { OrderService } from "../../application/services/OrderService";
import { Order } from "../../domain/order/entities/Order";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json({
        statusCode: 201,
        message: "Order created successfully",
        data: this.serializeOrder(order)
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.orderService.getOrder(req.params.id);
      res.status(200).json({
        statusCode: 200,
        message: "Order fetched successfully",
        data: this.serializeOrder(order)
      });
    } catch (error) {
      next(error);
    }
  }

  async listOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.listOrders();

      // Pagination parameters from query string (defaults: page 1, limit 10)
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const totalItems = orders.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const paginatedOrders = orders.slice(startIndex, startIndex + limit);

      res.status(200).json({
        statusCode: 200,
        message: "Orders fetched successfully",
        data: {
          items: paginatedOrders.map(this.serializeOrder),
          pagination: {
            page,
            limit,
            totalItems,
            totalPages,
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await this.orderService.cancelOrder(req.params.id);
      res.status(200).json({
        statusCode: 200,
        message: "Order cancelled successfully",
        data: this.serializeOrder(order)
      });
    } catch (error) {
      next(error);
    }
  }

  private serializeOrder(order: Order) {
    return {
      id: order.id,
      userId: order.userId,
      items: order.items,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    };
  }
}
