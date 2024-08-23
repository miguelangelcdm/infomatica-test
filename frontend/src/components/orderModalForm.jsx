import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const OrderModalForm = ({ open, onClose, onSubmit, products, orderData }) => {
    console.log("🚀 ~ OrderModalForm ~ products:", products)
    const [formProducts, setFormProducts] = useState([]);
    useEffect(() => {
        if (open) {
            const updatedProducts = orderData.products.map(product => ({
                ProductId: product.ProductId || '',
                quantity: product.quantity || '', 
                price: product.price || 0 
            }));
            setFormProducts(updatedProducts);
        }
    }, [open, orderData.products]);
    
    const handleProductChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProducts = [...formProducts];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        if (name === 'ProductId') {
            const selectedProduct = products.find(p => p.id === Number(value));
            updatedProducts[index].price = selectedProduct ? selectedProduct.price : 0;
        }
        setFormProducts(updatedProducts);
    };

    const handleAddProduct = () => {
        setFormProducts(prevProducts => [
            ...prevProducts, 
            { ProductId: '', quantity: 0, price: 0 }
        ]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...formProducts];
        updatedProducts.splice(index, 1);
        setFormProducts(updatedProducts);
    };

    const getSubtotal = (quantity, price) => (quantity * price).toFixed(2);

    const getTotalSubtotal = () => {
        return formProducts.reduce((total, product) => total + (product.quantity * product.price), 0).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formProducts);
        setFormProducts([]);
    };

    const handleClose = () => {
        setFormProducts([]);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', mt: 10, width: 400, maxHeight: '80vh', overflowY: 'auto' }}>
                <h3>Add Products to Order</h3>
                {formProducts.map((product, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                            <InputLabel>Product</InputLabel>
                            <Select
                                name="ProductId"
                                value={product.ProductId || ''}
                                onChange={(e) => handleProductChange(index, e)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select a product</MenuItem>
                                {products.map(p => (
                                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="quantity"
                            label="Quantity"
                            type="number"
                            value={product.quantity || ''}
                            onChange={(e) => handleProductChange(index, e)}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            name="price"
                            label="Price"
                            value={product.price || ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="textSecondary">
                            Subtotal: ${getSubtotal(product.quantity || 0, product.price || 0)}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Button onClick={() => handleRemoveProduct(index)} color="error">Remove</Button>
                    </Box>
                ))}
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Total Subtotal: ${getTotalSubtotal()}
                </Typography>
                <Button onClick={handleAddProduct} variant="outlined" fullWidth sx={{ mb: 2 }}>Add Product</Button>
                <Button type="submit" variant="contained" fullWidth>Submit</Button>
            </Box>
        </Modal>
    );
};

OrderModalForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired,
    orderData: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.shape({
            ProductId: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        })).isRequired
    }).isRequired
};

export default OrderModalForm;