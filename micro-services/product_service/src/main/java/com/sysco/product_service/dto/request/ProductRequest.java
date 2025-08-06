package com.sysco.product_service.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    private String title;
    private String description;
    private BigDecimal amount;
    private String amountType;
    private String status;
    private String sellerId;
    private BigDecimal pricePerUnit;
    private Long categoryId;
    private List<String> images;
}
