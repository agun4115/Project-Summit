import { apiClient } from "../sysco-shared-utility";

export const fetchCart = async (userId) => {
    const response = await apiClient.get(`/v1/carts/${userId}`);
    return response.data;
};

export const removeFromCart = async (userId, productId) => {
    const response = await apiClient.delete(`/v1/carts/${userId}/${productId}`);
    return response;
}

export const clearCart = async (userId) => {
    const response = await apiClient.delete(`/v1/carts/${userId}`);
    return response;
}

export const updateCartItems = async (userId, productId, count) => {
    const response = await apiClient.put(`/v1/carts/${userId}`, {
        productId,
        count
    });
    return response;
}

export const addToCart = async (userId, productId, count) => {
    const response = await apiClient.post(`/v1/carts/${userId}`, {
         productId, 
         count 
    });
    return response;
}
