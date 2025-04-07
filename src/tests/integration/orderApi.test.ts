import request from 'supertest';
import { createExpressServer } from '../../infrastructure/server/express';
import { createDynamoDBClient } from '../../infrastructure/aws/dynamodb-client'

describe('Orders API', () => {
  const ddbClient = createDynamoDBClient();
  const mockOrderRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const app = createExpressServer(ddbClient, 'test-table', mockOrderRepository);

  beforeAll(async () => {
    // Setup test data
  });

  test('POST /orders should create order', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        userId: 'test-user',
        items: [{ productId: 'prod-1', quantity: 2 }]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});