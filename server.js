import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http:/localhost: ${process.env.PORT}`);
});
