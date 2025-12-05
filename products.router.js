import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  res.send(await manager.getProducts());
});

router.get("/:pid", async (req, res) => {
  res.send(await manager.getProductById(req.params.pid));
});

router.post("/", async (req, res) => {
  await manager.addProduct(req.body);
  res.send("Producto agregado");
});

router.put("/:pid", async (req, res) => {
  await manager.updateProduct(req.params.pid, req.body);
  res.send("Producto actualizado");
});

router.delete("/:pid", async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  res.send("Producto eliminado");
});

export default router;
