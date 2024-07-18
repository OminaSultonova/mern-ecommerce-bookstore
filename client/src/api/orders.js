import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:4000/api/orders';

// Get all orders
export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get a single order by ID
export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order with id ${id}:`, error);
        throw error;
    }
};

// Create a new order
export const createOrder = async (order) => {
    try {
        const response = await axios.post(API_URL, order);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Update an order by ID
export const updateOrder = async (id, updatedOrder) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedOrder);
        return response.data;
    } catch (error) {
        console.error(`Error updating order with id ${id}:`, error);
        throw error;
    }
};

// Delete an order by ID
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting order with id ${id}:`, error);
        throw error;
    }
};
