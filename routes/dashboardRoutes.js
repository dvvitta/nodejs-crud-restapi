import express from "express";
import {
  getTopProductsPreviousYear,
  getTopCustomersPreviousYear,
  getTopCustomersByOrderValuePreviousYear,
  getTopCustomersByItemPreviousYear,
  getTop10ProductsPreviousYear,
  getMonthlySalesPreviousYearPerProduct,
  getMonthlyProductSalesQtyPreviousYear,
  getMonthlyOrdersPerCustomerPreviousYear,
  getMonthlyOrderNominalPerCustomerPreviousYear,
  getMonthlyServicesPreviousYear
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/top-products", getTopProductsPreviousYear);
router.get("/top-customers-order", getTopCustomersPreviousYear);
router.get("/top-customers-order-value", getTopCustomersByOrderValuePreviousYear);
router.get("/top-customers-item", getTopCustomersByItemPreviousYear);
router.get("/top-10-products", getTop10ProductsPreviousYear);
router.get("/monthly-sales-product", getMonthlySalesPreviousYearPerProduct);
router.get("/monthly-sales-qty-product", getMonthlyProductSalesQtyPreviousYear);
router.get("/monthly-orders-customer", getMonthlyOrdersPerCustomerPreviousYear);
router.get("/monthly-order-nominal-customer", getMonthlyOrderNominalPerCustomerPreviousYear);
router.get("/monthly-services", getMonthlyServicesPreviousYear);

export default router;
