import { Order } from "../../../domain/order/entities/Order";
import { OrderStatus } from "../../../domain/order/value-objects/OrderStatus";

describe('Order Entity', () => {
  const validOrderData = {
    userId: 'user-123',
    items: [{ productId: 'prod-1', quantity: 2 }]
  };

  test('should create valid order', () => {
    const order = new Order(validOrderData);
    expect(order.id).toBeDefined();
    expect(order.status).toBe(OrderStatus.CREATED);
  });

  test('should throw error for invalid items', () => {
    expect(() => new Order({ ...validOrderData, items: [] }))
      .toThrow('At least one item required');
  });

  test('should cancel order properly', () => {
    const order = new Order(validOrderData);
    order.cancel();
    expect(order.status).toBe(OrderStatus.CANCELLED);
  });
});