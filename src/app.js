import express from "express";
import productsRouter from "./rutas/products.js";
import cartRutas from "./rutas/cart.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use("/products", productsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRutas);

app.listen(PUERTO, () => {
  console.log(`El Servidor está escuchando en el Puerto ${PUERTO}`);
});