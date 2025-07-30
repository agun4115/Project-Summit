package com.sysco.cart_service.service;

import com.sysco.cart_service.dto.request.CartRequest;
import com.sysco.cart_service.dto.request.UpdateCartRequest;
import com.sysco.cart_service.dto.response.CartResponse;

import java.util.List;

public interface CartService {
    
    List<CartResponse> getCartByUserId(String userId);
    
    CartResponse addToCart(String userId, CartRequest request);
    
    CartResponse updateCartItem(String userId, UpdateCartRequest request);
    
    void removeFromCart(String userId, Long productId);
    
    void clearCart(String userId);
}
