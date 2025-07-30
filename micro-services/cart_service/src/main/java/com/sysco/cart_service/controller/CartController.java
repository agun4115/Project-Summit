package com.sysco.cart_service.controller;

import java.util.List;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sysco.cart_service.dto.response.CartResponse;
import com.sysco.cart_service.service.CartService;
import com.sysco.cart_service.dto.request.CartRequest;
import com.sysco.cart_service.dto.request.UpdateCartRequest;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = {
    "http://localhost:9001",
}, allowCredentials = "true")
@Slf4j
public class CartController extends AbstractController {

    private final CartService cartService;
    
    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")    
    public ResponseEntity<?> getCartItems(@PathVariable String userId){
        logRequest("Get Cart Items", userId);
        List<CartResponse> cartItems = cartService.getCartByUserId(userId); 
        return createSuccessResponse("Cart items retrieved successfully", cartItems, HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable String userId, @RequestBody CartRequest request) {
        logRequest("Add to Cart", userId, request);
        CartResponse cartItem = cartService.addToCart(userId, request);
        return createSuccessResponse("Item added to cart successfully", cartItem, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateCart(@PathVariable String userId, @RequestBody UpdateCartRequest request) {
        logRequest("Update Cart", userId, request);
        CartResponse updated = cartService.updateCartItem(userId, request);
        return createSuccessResponse("Cart updated successfully", updated, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> clearCart(@RequestParam String userId) {
        logRequest("Clear Cart", userId);
        cartService.clearCart(userId);
        return createSuccessResponse("Cart cleared successfully", null, HttpStatus.OK);
    }
}
