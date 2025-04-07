import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { validateCreateOrder } from '../middleware/validationMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

export const createOrderRoutes = (
  controller: OrderController
): express.Router => {
  const router = express.Router();

  router.post(
    '/',
    authMiddleware,
    validateCreateOrder,
    controller.createOrder.bind(controller)
  );

  router.get('/:id', authMiddleware, controller.getOrder.bind(controller));
  router.get('/', authMiddleware, controller.listOrders.bind(controller));
  router.delete('/:id',authMiddleware, authMiddleware, controller.cancelOrder.bind(controller));

  return router;
};