package com.sysco.product_service.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.entity.Product;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    ProductResponse productToProductResponse(Product product);
    List<ProductResponse> productsToProductResponses(List<Product> products);
    
    @Mapping(target = "amountType", expression = "java(Product.AmountType.valueOf(productRequest.getAmountType()))")
    Product productRequestToProduct(ProductRequest productRequest);
}
