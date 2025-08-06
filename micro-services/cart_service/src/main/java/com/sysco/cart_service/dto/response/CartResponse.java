package com.sysco.cart_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    
    private String userId;
    private Long productId;
    private Integer count;
}
