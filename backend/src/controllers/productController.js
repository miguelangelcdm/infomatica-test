const productService = require("../services/productService");
exports.createProduct = async (req, res) => {
  try {
    const {name, subGroupId, price} = req.body
    const product = await productService.createProduct({name, subGroupId, price});
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const product = await productService.updateProduct(id, data);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.deleteProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProductsToOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
      const products = req.body;
      const updatedOrder = await productService.addProductsToOrder(orderId, products);
      res.status(200).json(updatedOrder);
  } catch (error) {
      console.error('Error in addProductsToOrder controller:', error)
      res.status(500).json({ error: error.message })
  }
};