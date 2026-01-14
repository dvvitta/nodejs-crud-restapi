import express from 'express';
import { getCategories, saveCategory, getCategoryById, updateCategory, deleteCategory, productByCategory } from '../controllers/productCategories.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', saveCategory);
router.get('/:category_id', getCategoryById);
router.put('/:category_id', updateCategory);
router.delete('/:category_id', deleteCategory);
router.get('/:category_id/products', productByCategory);

export default router;