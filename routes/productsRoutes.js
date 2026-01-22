import express from "express";
import {
  getProducts,
  saveProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
} from "../controllers/productsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), saveProducts);
router.get("/", getProducts);
router.get("/:product_id", getProductsById);
router.put("/:product_id", upload.single("image="), updateProducts);
router.delete("/:product_id", deleteProducts);

export default router;
