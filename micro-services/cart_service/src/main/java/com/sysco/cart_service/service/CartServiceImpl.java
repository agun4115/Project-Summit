package com.sysco.cart_service.service;

import com.sysco.cart_service.dto.mapper.CartMapper;
import com.sysco.cart_service.dto.request.CartRequest;
import com.sysco.cart_service.dto.request.UpdateCartRequest;
import com.sysco.cart_service.dto.response.CartResponse;
import com.sysco.cart_service.entity.Cart;
import com.sysco.cart_service.exception.NotFoundException;
import com.sysco.cart_service.repository.CartRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    
    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    
    @Override
    public List<CartResponse> getCartByUserId(String userId) {
        log.info("Getting cart items for user: {}", userId);

        List<Cart> cartItems = cartRepository.findByUserId(userId);
        return cartMapper.cartListToCartResponseList(cartItems);
    }
    
    @Override
    @Transactional
    public CartResponse addToCart(String userId, CartRequest request) {
        log.info("Adding item to cart for user: {}, product: {}", userId, request.getProductId());
        
        // Check if item already exists in cart
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(
            userId, request.getProductId());
        
        Cart cart;
        if (existingCart.isPresent()) {
            // Update quantity if item already exists
            cart = existingCart.get();
            cart.setCount(cart.getCount() + request.getCount());
            log.info("Updated existing cart item quantity to: {}", cart.getCount());
        } else {
            // Create new cart item
            cart = cartMapper.cartRequestToCart(request);
            cart.setUserId(userId);
            log.info("Created new cart item");
        }
        
        Cart savedCart = cartRepository.save(cart);
        return cartMapper.cartToCartResponse(savedCart);
    }
    
    @Override
    @Transactional
    public CartResponse updateCartItem(String userId, UpdateCartRequest request) {
        log.info("Updating cart for user: {}", userId);

        // Clear existing cart items for the user
        cartRepository.deleteByUserId(userId);
        
        // Add new items
        Cart lastSavedCart = null;
        for (UpdateCartRequest.CartItemRequest item : request.getItems()) {
            if (item.getCount() > 0) {
                Cart cart = new Cart();
                cart.setUserId(userId);
                cart.setProductId(item.getProductId());
                cart.setCount(item.getCount());
                lastSavedCart = cartRepository.save(cart);
            }
        }
        
        log.info("Cart updated successfully for user: {}", userId);
        
        // Return the last saved cart item, or create a dummy response if no items were saved
        if (lastSavedCart != null) {
            return cartMapper.cartToCartResponse(lastSavedCart);
        } else {
            // Return empty cart response if no items were added
            return new CartResponse();
        }
    }
    
    @Override
    @Transactional
    public void removeFromCart(String userId, Long productId) {
        log.info("Removing item from cart for user: {}, product: {}", userId, productId);
        
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        if (existingCart.isEmpty()) {
            throw new NotFoundException("Cart item not found for user: " + userId + " and product: " + productId);
        }
        
        cartRepository.deleteByUserIdAndProductId(userId, productId);
        log.info("Item removed from cart successfully");
    }
    
    @Override
    @Transactional
    public void clearCart(String userId) {
        log.info("Clearing cart for user: {}", userId);
        cartRepository.deleteByUserId(userId);
        log.info("Cart cleared successfully for user: {}", userId);
    }
}
