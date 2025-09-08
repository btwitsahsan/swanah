const express = require("express");
const { placeOrder, getOrders, getAdminOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/getOrders",protect, getOrders);
router.get("/getAdminOrders", getAdminOrders);
router.put("/updateOrderStatus",protect, adminOnly, updateOrderStatus);

module.exports = router;