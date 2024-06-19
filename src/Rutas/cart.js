import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const cartFilePath = path.resolve("./src/data/cart.json");
const productsFilePath = path.resolve("./src/data/products.json");

const getCart = () => {
  try {
    const products = fs.readFileSync(cartFilePath, "utf-8");
    return JSON.parse(products) || [];
  } catch (error) {
    console.error("Error reading carts file:", error);
    return [];
  }
};

const saveCart = (cart) => {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
  } catch (error) {
    console.error("Error guardando archivo cart", error);
  }
};

const getProducts = () => {
  try {
    const products = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error leyendo archivo products", error);
    return [];
  }
};

router.get("/", (req, res) => {
  const { limit } = req.query;
  const carts = getCart();
  if (limit) {
    res.json(cart.slice(0, limit));
  } else {
    res.json(cart);
  }
})


router.post("/", (req, res) => {
  const cart = getCart();
  const id =
    (cart.length ? Math.max(...cart.map((c) => parseInt(c.id))) : 0) + 1;
  const newCart = { id: id.toString(), products: [] };
  carts.push(newCart);
  saveCarts(carts);
  res
    .status(201)
    .json({ message: `Cart with ID ${id} was successfully created`, newCart });
});


router.get("/:cid", (req, res) => {
  const carts = getCarts();
  const cart = cart.find((c) => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({
      message: `Cart con ID ${req.params.cid} no fue encontrado`,
    });
  }
});


router.post("/:cid/product/:pid", (req, res) => {
  const carts = getCarts();
  const products = getProducts();

  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart) {
    return res.status(404).json({
      message: `Cart with ID ${req.params.cid} was not found`,
    });
  }

  const product = products.find((p) => p.id === req.params.pid);
  if (!product) {
    return res.status(404).json({
      message: `Product with ID ${req.params.pid} was not found`,
    });
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product === req.params.pid
  );
  if (productIndex === -1) {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  } else {
    cart.products[productIndex].quantity += 1;
  }

  saveCarts(cart);
  res.status(201).json(carts);
});

export default router;