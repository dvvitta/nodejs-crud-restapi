import express from 'express';
import { getCustomers, saveCustomers , getCustomerById, updateCustomers, deleteCustomers } from '../controllers/customersController.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', saveCustomers);
router.get('/:id', getCustomerById);
router.put('/:cust_id', updateCustomers);
router.delete('/:cust_id', deleteCustomers);

export default router;