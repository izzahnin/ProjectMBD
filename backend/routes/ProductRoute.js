import express from "express";
import { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } from "../controllers/ProductsController.js";

import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/products",  verifyUser, getProducts);
router.get("/products/:id",  verifyUser, getProductById);
router.post("/products",  verifyUser, saveProduct);
router.patch("/products/:id",  verifyUser, updateProduct);
router.delete("/products/:id",  verifyUser, deleteProduct);

export default router;
