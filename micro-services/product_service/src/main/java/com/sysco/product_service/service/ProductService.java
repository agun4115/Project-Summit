package com.sysco.product_service.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;
import com.sysco.product_service.dto.response.ProductResponse;

import java.math.BigDecimal;

public interface ProductService {

    Page<ProductResponse> getAllProducts(
        String q, 
        Long category, 
        String amountType,
        String status,
        // String seller, 
        BigDecimal minPrice, 
        BigDecimal maxPrice, 
        Pageable pageable
    );

    ProductResponse getProductById(Long productId);

    ProductResponse createProduct(ProductRequest productRequest);

    ProductResponse updateProduct(Long productId, ProductRequest productRequest);
    
    ProductResponse updateProductStatus(Long productId, ProductStatusRequest statusRequest);

    void deleteProduct(Long productId);
}
