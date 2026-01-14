import express from 'express';
import { getOrders, saveOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/', saveOrder);
router.get('/:order_id', getOrderById);
router.put('/:order_id', updateOrder);
router.delete('/:order_id', deleteOrder);

export default router;