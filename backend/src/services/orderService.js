const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ProductOrder = require("../models/productOrderModel");

const createOrder = async () => {
  try {
    const order = await Order.create();
    return order;
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
};

const getAllOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          through: {
            model: ProductOrder,
            attributes: ["quantity"],
          },
        },
      ],
    });
    return orders;
  } catch (error) {
    throw new Error("Error retrieving orders: " + error.message);
  }
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          through: {
            model: ProductOrder,
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    throw new Error("Error retrieving order: " + error.message);
  }
};

const updateOrder = async (id, orderData, productData) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.update(orderData);

    for (const product of productData) {
      const existingProductOrder = await ProductOrder.findOne({
        where: {
          OrderId: id,
          ProductId: product.ProductId,
        },
      });

      if (existingProductOrder) {
        await existingProductOrder.update({ quantity: product.quantity });
      } else {
        await ProductOrder.create({
          OrderId: id,
          ProductId: product.ProductId,
          quantity: product.quantity,
        });
      }
    }

    return order;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
};

const deleteOrder = async (id) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
    return { message: "Order deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting order: " + error.message);
  }
};

// const fetchOrderProducts = async (orderId) => {
//     try {
//         const order = await Order.findByPk(orderId, {
//             include: {
//                 model: Product,
//                 through: { attributes: ['quantity'] },
//             },
//         });

//         if (!order) {
//             throw new Error('Order not found');
//         }

//         return order.Products.map(product => ({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             quantity: product.ProductOrder.quantity,
//         }));
//     } catch (error) {
//         console.error('Error fetching order products:', error);
//         throw new Error('Failed to fetch order products');
//     }
// };

const fetchOrderProducts = async (orderId) => {
  try {
      // Fetch the order with products
      const order = await Order.findByPk(orderId, {
          include: {
              model: Product,
              through: { attributes: ['quantity'] },
          },
      });

      if (!order) {
          throw new Error('Order not found');
      }

      // Log the raw data
      console.log('Raw Order Data:', order);

      // Map and return products with additional logging
      const productsData = order.Products.map(product => ({
          ProductId: product.id, // Ensure this field is correctly set
          name: product.name,
          price: product.price,
          quantity: product.ProductOrder.quantity,
      }));

      console.log('Mapped Products Data:', productsData);

      return productsData;
  } catch (error) {
      console.error('Error fetching order products:', error);
      throw new Error('Failed to fetch order products');
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  fetchOrderProducts
};
