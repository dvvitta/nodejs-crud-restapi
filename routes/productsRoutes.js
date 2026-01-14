import express from 'express';
import { getProducts, saveProducts, getProductsById, updateProducts, deleteProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', saveProducts);
router.get('/:product_id', getProductsById);
router.put('/:product_id', updateProducts);
router.delete('/:product_id', deleteProducts);

export default router;