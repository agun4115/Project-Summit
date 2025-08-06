package com.sysco.product_service.controller;

import java.math.BigDecimal;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.service.ProductService;
import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = {
    "http://localhost:9001",
}, allowCredentials = "true")
@Slf4j
public class ProductController extends AbstractController {

    private final ProductService productService;
    
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")    
    public ResponseEntity<?> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String amountType,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sellerId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        
        logRequest("Get Products", page, limit, sortBy, sortOrder, sellerId, q, category, amountType, status, minPrice, maxPrice);
        
        Sort sort = sortOrder.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, limit, sort);
        logRequest("pagable", pageable);
        Page<ProductResponse> products = productService.getAllProducts(q, category, amountType, status, sellerId, minPrice, maxPrice, pageable);
        // logRequest("Shit", products);
        
        return createPageableSuccessResponse("Products retrieved successfully", products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        logRequest("Get Product by ID", id);
        ProductResponse product = productService.getProductById(id);
        return createSuccessResponse("Product retrieved successfully", product, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        logRequest("Create Product", request);
        ProductResponse created = productService.createProduct(request);
        return createSuccessResponse("Product created successfully", created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        logRequest("Update Product", id, request);
        ProductResponse updated = productService.updateProduct(id, request);
        return createSuccessResponse("Product updated successfully", updated, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateProductStatus(@PathVariable Long id, @RequestBody ProductStatusRequest request) {
        logRequest("Update Product Status", id, request);
        ProductResponse updated = productService.updateProductStatus(id, request);
        return createSuccessResponse("Product status updated successfully", updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        logRequest("Delete Product", id);
        productService.deleteProduct(id);
        return createSuccessResponse("Product deleted successfully", null, HttpStatus.OK);
    }
}
