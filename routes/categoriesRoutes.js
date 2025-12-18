import express from 'express';
import { getCategories, saveCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', saveCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;