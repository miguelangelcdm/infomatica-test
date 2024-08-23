const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

router.post("/", verifyToken, orderController.createOrder);
router.get("/", verifyToken, orderController.getAllOrders);
router.get("/:id", verifyToken, orderController.getOrderById);
router.put("/:id", verifyToken, orderController.updateOrder);
router.delete("/:id", verifyToken, orderController.deleteOrder);
router.get('/:orderId/products', orderController.getOrderProducts);

module.exports = router;
