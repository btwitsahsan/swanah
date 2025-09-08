const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { addCategory, getCategories, deleteCategory } = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory", protect, adminOnly, addCategory)
router.get("/getCategories", protect, adminOnly, getCategories)
router.delete("/deleteCategory/:id", protect, adminOnly, deleteCategory)

module.exports = router;