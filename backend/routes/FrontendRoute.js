import express from "express";
import { getProductsHome, getProductPage, getProductDetail} from "../controllers/FrontendController.js";

const router = express.Router();

router.get('/productHome', getProductsHome);
router.get('/productPage', getProductPage);
router.get('/productDetail', getProductDetail);

// handle keranjang
router.get('/cart', getCartData);
router.post('/cart', addCartData);
router.put('/cart/:id', updateCartData);
router.delete('/cart/:id', deleteCartData);

// handle checkout
router.get('/checkout/:cartId', getCheckoutData);


export default router;