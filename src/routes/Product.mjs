import productRoute from './../products/Products.mjs';
import express from "express";
const router = express.Router()

router.use("/", productRoute);

router.get("/", productRoute.getProduct)
router.post("/", productRoute.createProduct)
router.put("/:id", productRoute.editProduct)
router.delete("/:id", productRoute.deleteProduct)

export default router;r