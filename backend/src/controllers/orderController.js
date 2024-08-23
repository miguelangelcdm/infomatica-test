const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  try {
    // const { orderData, productData } = req.body;
    const order = await orderService.createOrder();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderData, productData } = req.body;
    const order = await orderService.updateOrder(id, orderData, productData);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await orderService.deleteOrder(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderProducts = async (req, res) => {
  const { orderId } = req.params;

  try {
      const products = await orderService.fetchOrderProducts(orderId);
      res.json(products);
  } catch (error) {
      console.error("Error fetching order products:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};