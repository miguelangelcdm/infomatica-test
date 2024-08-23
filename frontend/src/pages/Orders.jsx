import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import OrderModalForm from '../components/OrderModalForm';
import { getOrders, createOrder, getOrderProducts } from "../services/orderService";
import { getProducts } from '../services/productService';
import { addProductsToOrder } from '../services/productService';
import ListTable from "../components/ListTable";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({ products: [] });

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            const ordersWithTotals = await Promise.all(data.map(async order => {
                const productsInOrder = await getOrderProducts(order.id);
                const total = productsInOrder.reduce((sum, product) => sum + product.quantity * product.price, 0);
                return { ...order, total };
            }));
            setOrders(ordersWithTotals);
        } catch (error) {
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    const handleCreateOrder = async (productList) => {
        try {
            const newOrder = await createOrder();
            await addProductsToOrder(newOrder.id, productList);
            setOpen(false);
            fetchOrders();
        } catch (error) {
            setError('Failed to create order and add products');
        }
    };

    const handleEditOrder = async (orderId) => {
    try {
        const productsInOrder = await getOrderProducts(orderId);
        console.log("Fetched productsInOrder:", productsInOrder);

        const updatedProducts = productsInOrder.map(product => ({
            ProductId: product.id,
            quantity: product.quantity || 0,
            price: product.price || 0
        }));

        console.log("🚀 ~ updatedProducts:", updatedProducts);
        setOrderData({ products: updatedProducts });
        setOpen(true);
    } catch (error) {
        setError('Failed to fetch order details');
    }
};

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const columns = [
        { key: 'id', label: 'Order ID' },
        { key: 'createdAt', label: 'Date' },
        { key: 'total', label: 'Total' },
    ];

    return (
        <>
            <div>
                <Typography variant="h4" gutterBottom>Orders</Typography>
                <Button onClick={() => setOpen(true)} variant="contained">Create Order</Button>
            </div>
            <ListTable 
                data={orders}
                columns={columns}
                loading={loading}
                error={error}
                onEditClick={handleEditOrder}
            />
            <OrderModalForm 
                open={open}
                onClose={() => {
                    setOpen(false);
                    setOrderData({ products: [] });
                }}
                onSubmit={handleCreateOrder}
                products={products}
                orderData={orderData} 
            />
        </>
    );
};

export default Orders;