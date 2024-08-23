const Product = require('../models/productModel')
const SubGroup = require('../models/subGroupModel');
const Order = require('../models/orderModel')
const ProductOrder = require('../models/productOrderModel')

const createProduct = async ({ name, subGroupId, price }) => {
    if (!name || !subGroupId || price == null) {
        throw new Error('Invalid request data');
    }

    const subGroup = await SubGroup.findByPk(subGroupId);
    if (!subGroup) {
        throw new Error('SubGroup not found');
    }

    const product = await Product.create({
        name,
        price,
        subGroupId
    });

    return product;
};

const getAllProducts = async () => {
    try {
        const products = await Product.findAll()
        return products
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProductById = async (id) => {
    const product = await Product.findByPk(id, {
        include: {
            model: SubGroup,
            as: 'subGroup',
            include: 'group'
        }
    });

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};

const updateProduct = async (id, { name, subGroupId, price }) => {
    if (!name || !subGroupId || price == null) {
        throw new Error('Invalid request data');
    }

    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }

    const subGroup = await SubGroup.findByPk(subGroupId);
    if (!subGroup) {
        throw new Error('SubGroup not found');
    }

    product.name = name;
    product.subGroupId = subGroupId;
    product.price = price;

    await product.save();
    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }

    await product.destroy();
    return { message: 'Product deleted successfully' };
};

const addProductsToOrder = async (orderId, products) => {
    // console.log("🚀 ~ addProductsToOrder ~ products:", products);
    const order = await Order.findByPk(orderId);
    // console.log("🚀 ~ addProductsToOrder ~ order:", order);

    if (!order) {
        throw new Error('Order not found');
    }

    for (const product of products) {
        try {
            // console.log("🚀 ~ addProductsToOrder ~ product:", product);
            const productExists = await Product.findByPk(product.ProductId);
            if (!productExists) {
                throw new Error(`Product with ID ${product.ProductId} not found`);
            }

            await ProductOrder.create({
                OrderId: orderId, 
                ProductId: product.ProductId,
                quantity: product.quantity,
                price: product.price
            });
        } catch (error) {
            console.error('Error while adding product to order:', error)
            throw error
        }
    }

    return await Order.findByPk(orderId, {
        include: Product
    });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProductsToOrder
};