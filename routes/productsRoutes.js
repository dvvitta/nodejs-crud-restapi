import express from 'express';
import { getProducts, saveProducts, getProductsById, updateProducts, deleteProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', saveProducts);
router.get('/:id', getProductsById);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);

export default router;