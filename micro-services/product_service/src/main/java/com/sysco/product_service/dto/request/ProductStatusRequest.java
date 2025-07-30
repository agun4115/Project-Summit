package com.sysco.product_service.dto.request;

import com.sysco.product_service.entity.Product;
import lombok.Data;

@Data
public class ProductStatusRequest {
    private Product.ProductStatus status;
}
