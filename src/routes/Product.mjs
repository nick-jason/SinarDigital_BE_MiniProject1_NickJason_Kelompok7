import product from '../products/Products.mjs';
import express from "express";
const router = express.Router()

router.get("/", product.getProduct)
router.post("/", product.createProduct)
router.put("/:id", product.editProduct)
router.delete("/:id", product.deleteProduct)

export default router;