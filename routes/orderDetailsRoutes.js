import express from 'express';
import { getOrderDetails, saveOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails} from '../controllers/orderDetailsController.js';

const router = express.Router();

router.get('/', getOrderDetails);
router.post('/', saveOrderDetails);
router.get('/:order_id', getOrderDetailsById);
router.put('/:order_id/:product_id', updateOrderDetails);
router.delete('/:order_id/:product_id', deleteOrderDetails);

export default router;