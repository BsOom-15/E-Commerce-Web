import express from "express";
import formidableMiddleware from "express-formidable";
const router = express.Router();

// Controllers: 
import { 
    addProduct, 
    updateProductDetails,
    removeProduct,
    fetchProduct,
    fetchProductById,
    fetchAllProduct,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
} from "../controller/productController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

router.route("/")
.get(fetchProduct)
.post(authenticate, authorizeAdmin, formidableMiddleware(), addProduct)

router.route("/allproduct").get(fetchAllProduct)
router
.route("/:id/reviews")
.post(authenticate,checkId, addProductReview)

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts)

router
.route('/:id')
.get(fetchProductById)
.put(authenticate, authorizeAdmin, formidableMiddleware(), updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct)

router
.route('/filtered-products')
.post(filterProducts)

export default router;
