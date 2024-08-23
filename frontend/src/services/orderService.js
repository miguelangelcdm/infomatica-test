const API_URL = '/api/orders';

export const getOrders = async () => {
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
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};

export const createOrder = async () => {
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
        // body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create order: ${errorData.message || response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  };

  export const getOrderProducts = async (orderId) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    try {
        const response = await fetch(`${API_URL}/${orderId}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch order products: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch order products: ${error.message}`);
    }
};

export const getOrderById = async (orderId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch order: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
};

export const updateOrder = async (orderId, products) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    try {
        const response = await fetch(`${API_URL}/products/orders/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(products),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update order: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to update order: ${error.message}`);
    }
};