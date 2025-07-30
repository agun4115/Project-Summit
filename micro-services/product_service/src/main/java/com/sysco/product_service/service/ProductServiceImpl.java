package com.sysco.product_service.service;

import com.sysco.product_service.dto.mapper.ProductMapper;
import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;
import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.entity.Product;
import com.sysco.product_service.exception.NotFoundException;
import com.sysco.product_service.repository.ProductRepository;
import com.sysco.product_service.utils.Sanitization;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    
    @Override
    public Page<ProductResponse> getAllProducts(
            String q, 
            Long category, 
            String amountType,
            String status,
            // String seller, 
            BigDecimal minPrice, 
            BigDecimal maxPrice, 
            Pageable pageable) {
        
                
        // Convert q to lower case if not null
        String query = Sanitization.nullToEmptyString(q);
        log.info("Getting products with filters - q: {}, category: {}, amountType: {}, status: {}, minPrice: {}, maxPrice: {}, page: {}", query, category, amountType, status, minPrice, maxPrice, pageable.getPageNumber());

        // Convert string parameters to enums
        Product.AmountType amountTypeEnum = amountType != null ? Product.AmountType.valueOf(amountType) : null;
        Product.ProductStatus statusEnum = status != null ? Product.ProductStatus.valueOf(status) : null;
        
        Page<Product> products = productRepository.findProductsWithFilters(query, category, amountTypeEnum, statusEnum, minPrice, maxPrice, pageable);
        return products.map(productMapper::productToProductResponse);
    }

    @Override
    public ProductResponse getProductById(Long productId) {
        log.info("Getting product by id: {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + productId));
        return productMapper.productToProductResponse(product);
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        log.info("Creating new product: {}", productRequest.getTitle());
        Product product = productMapper.productRequestToProduct(productRequest);
        Product savedProduct = productRepository.save(product);
        return productMapper.productToProductResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest productRequest) {
        log.info("Updating product with id: {}", productId);
        Product existing = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + productId));

        existing.setTitle(productRequest.getTitle());
        existing.setDescription(productRequest.getDescription());
        existing.setAmount(productRequest.getAmount());
        existing.setAmountType(Product.AmountType.valueOf(productRequest.getAmountType()));
        existing.setPricePerUnit(productRequest.getPricePerUnit());
        existing.setCategoryId(productRequest.getCategoryId());
        existing.setImages(productRequest.getImages());

        Product saved = productRepository.save(existing);
        return productMapper.productToProductResponse(saved);
    }

    @Override
    public ProductResponse updateProductStatus(Long productId, ProductStatusRequest statusRequest) {
        log.info("Updating product status for id: {} to {}", productId, statusRequest.getStatus());
        Product existing = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + productId));

        existing.setStatus(statusRequest.getStatus());
        existing.setReviewedAt(LocalDateTime.now());
        // You might want to set reviewedBy from the current user context
        existing.setReviewedBy("system"); // This should be replaced with actual user ID

        Product saved = productRepository.save(existing);
        return productMapper.productToProductResponse(saved);
    }

    @Override
    public void deleteProduct(Long productId) {
        log.info("Deleting product with id: {}", productId);
        if (!productRepository.existsById(productId)) {
            throw new NotFoundException("Product not found with id: " + productId);
        }
        productRepository.deleteById(productId);
    }
}
