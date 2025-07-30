package com.sysco.cart_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    
    private UUID id;
    private String userId;
    private Long productId;
    private Integer count;
}
