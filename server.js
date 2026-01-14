import express from "express";
import dotenv from "dotenv";
import customersRoutes from "./routes/customersRoutes.js";
import categoriesRoutes from "./routes/productCategoriesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", customersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/order-details", orderDetailsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
