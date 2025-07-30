package com.sysco.product_service.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sysco.product_service.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal amount;
    private String amountType;
    private BigDecimal pricePerUnit;
    private Long categoryId;
    private List<String> images;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private Product.ProductStatus status;
    private String reviewedBy;
    private LocalDateTime reviewedAt;
}
