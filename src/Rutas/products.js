import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const productosFilePath = path.resolve("./src/data/productos.json");

const getProductos = () => {
  try {
    const data = fs.readFileSync(productosFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error al leer el Producto del archivo:", error);
    return [];
  }
};

const guardarProductos = (products) => {
  fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
};



router.get("/", (req, res) => {
  const { limit } = req.query;
  const products = getProductos();
  if (limit) {
    res.json(productos.slice(0, limit));
  } else {
    res.json(productos);
  }
});


router.get("/:pid", (req, res) => {
  const productos = getProducts();
  const producto = productos.find((p) => p.id === req.params.pid);
  if (producto) {
    res.json(producto);
  } else {
    res
      .status(404)
      .json({ mensaje: `Producto con ID ${req.params.pid} no fue encontrardo` });
  }
});


router.post("/", (req, res) => {
   const {
     title,
     description,
     code,
     price,
     status = true,
     stock,
     category,  
   } = req.body;
   if (!title || !description || !code || !price || !stock || !category) {
     return res
       .status(400)
       .json({ mensaje: "Todos los campos son obligatorios" });
   }

   const productos = getProductos();
   const id =
     (products.length ? Math.max(...products.map((p) => parseInt(p.id))) : 0) +
     1;
   const newProduct = {
     id: id.toString(),
     title,
     description,
     code,
     price,
     status,
     stock,
     category,
     thumbnails,
   };
   products.push(newProduct);
   saveProducts(products);
   res.status(201).json({
     mensaje: "Producto creado exitosamente",
     nuevoProducto,
   });
 });


 router.put("/:pid", (req, res) => {
   const products = getProducts();
   const productIndex = products.findIndex((p) => p.id === req.params.pid);
   if (productIndex === -1) {
     return res
       .status(404)
       .json({ mensaje: `Producto con ID ${req.params.pid} no fue encontrado` });
   }

   const productoActualizado = {
     ...products[productIndex],
     ...req.body,
     id: products[productIndex].id,
   };
   products[productIndex] = productoActualizado;
   guardarProductos(products);
   res.json({ message: "Producto actualizado con exito", productoActualziado });
 });


 router.delete("/:pid", (req, res) => {
   const products = getProducts();
   const newProducts = products.filter((p) => p.id !== req.params.pid);

   if (newProduct.length === products.length) {
     return res
       .status(404)
       .json({ mensaje: `Producto con ID ${req.params.pid} no fue encontrado` });
   }

   guardarProductos(nuevoProductos);
   res
     .status(200)
     .json({
       mensaje: `Producto con ID ${req.params.pid} exitosamente eliminado`,
     });
 });

export default router;