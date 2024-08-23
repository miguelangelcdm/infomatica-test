const API_URL = '/api/products';

export const getProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    return products.map(product => ({
        ...product,
        price: Number(product.price)
    }));
};

export const createProduct = async (data) => {
    console.log("🚀 ~ createProduct ~ data:", data);
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        console.log("🚀 ~ createProduct ~ Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log("🚀 ~ createProduct ~ Error Response Text:", errorText);
            throw new Error(`Failed to create product: ${errorText || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("🚀 ~ createProduct ~ Catch Error:", error.message);
        throw new Error(`Failed to create product: ${error.message}`);
    }
};

export const addProductsToOrder = async (orderId, products) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(products)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add products to order: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to add products to order: ${error.message}`);
    }
};