const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

router.post("/", verifyToken, productController.createProduct);
router.get("/", verifyToken, productController.getAllProducts);
router.get("/:id", verifyToken, productController.getProductById);
router.put("/:id", verifyToken, productController.updateProduct);
router.delete("/:id", verifyToken, productController.deleteProduct);
router.post("/orders/:id/", verifyToken, productController.addProductsToOrder);

module.exports = router;
