package com.sysco.cart_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartRequest {
    private List<CartItemRequest> items;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemRequest {
        private Long productId;
        private Integer count;
    }
}
