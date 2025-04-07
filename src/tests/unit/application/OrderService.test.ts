import { OrderService } from '../../../application/services/OrderService';
import { Order } from '../../../domain/order/entities/Order';
import { mock } from 'jest-mock-extended';
import type { IOrderRepository } from '../../../domain/order/repositories/IOrderRepository'

describe('OrderService', () => {
  const mockRepo = mock<IOrderRepository>();
  const service = new OrderService(mockRepo);
  const testOrder = new Order({
    userId: 'user-1',
    items: [{ productId: 'prod-1', quantity: 1 }]
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createOrder should validate input', async () => {
    mockRepo.create.mockResolvedValue(testOrder);
    
    const result = await service.createOrder({
      userId: 'user-1',
      items: [{ productId: 'prod-1', quantity: 1 }]
    });

    expect(result).toBeInstanceOf(Order);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
  });

  test('getOrder should handle not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    
    await expect(service.getOrder('invalid-id'))
      .rejects
      .toThrow('Order not found');
  });
});