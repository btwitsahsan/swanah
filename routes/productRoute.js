const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct, dashboard } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", protect, adminOnly, dashboard)
router.post("/createProduct", protect, adminOnly , createProduct)
router.get("/getProducts", getProducts)
router.get("/getProductById/:id", getProduct)
router.delete("/deleteProduct/:id",protect ,adminOnly, deleteProduct)
router.post("/updateProduct/:id",protect ,adminOnly, updateProduct)

module.exports = router;