package com.sysco.product_service.service;

import com.sysco.product_service.dto.mapper.ProductMapper;
import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;
import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.entity.Product;
import com.sysco.product_service.exception.NotFoundException;
import com.sysco.product_service.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product testProduct;
    private ProductResponse testProductResponse;
    private ProductRequest testProductRequest;

    @BeforeEach
    void setUp() {
        testProduct = new Product();
        testProduct.setId(1L);
        testProduct.setTitle("Test Product");
        testProduct.setDescription("Test Description");
        testProduct.setAmount(new BigDecimal("10.50"));
        testProduct.setAmountType(Product.AmountType.KG);
        testProduct.setPricePerUnit(new BigDecimal("25.99"));
        testProduct.setCategoryId(1L);
        testProduct.setStatus(Product.ProductStatus.ACCEPTED);
        testProduct.setSellerId("seller123");

        testProductResponse = new ProductResponse();
        testProductResponse.setId(1L);
        testProductResponse.setTitle("Test Product");
        testProductResponse.setDescription("Test Description");
        testProductResponse.setAmount(new BigDecimal("10.50"));
        testProductResponse.setAmountType("KG");
        testProductResponse.setPricePerUnit(new BigDecimal("25.99"));
        testProductResponse.setCategoryId(1L);
        testProductResponse.setStatus(Product.ProductStatus.ACCEPTED);

        testProductRequest = new ProductRequest();
        testProductRequest.setTitle("Test Product");
        testProductRequest.setDescription("Test Description");
        testProductRequest.setAmount(new BigDecimal("10.50"));
        testProductRequest.setAmountType("KG");
        testProductRequest.setPricePerUnit(new BigDecimal("25.99"));
        testProductRequest.setCategoryId(1L);
        testProductRequest.setSellerId("seller123");
    }

    @Test
    void getAllProducts_ShouldReturnPageOfProducts() {
        // Given
        List<Product> products = Arrays.asList(testProduct);
        Page<Product> productPage = new PageImpl<>(products);
        Pageable pageable = mock(Pageable.class);
        
        when(productRepository.findProductsWithFilters(
            anyString(), any(), any(), any(), anyString(), any(), any(), any()))
            .thenReturn(productPage);
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        Page<ProductResponse> result = productService.getAllProducts(
            "test", 1L, "KG", "ACCEPTED", "seller123", 
            new BigDecimal("10"), new BigDecimal("100"), pageable);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals(testProductResponse.getTitle(), result.getContent().get(0).getTitle());
        verify(productRepository).findProductsWithFilters(
            eq("test"), eq(1L), eq(Product.AmountType.KG), 
            eq(Product.ProductStatus.ACCEPTED), eq("seller123"), 
            eq(new BigDecimal("10")), eq(new BigDecimal("100")), eq(pageable));
    }

    @Test
    void getAllProducts_WithNullQuery_ShouldUseEmptyString() {
        // Given
        List<Product> products = Arrays.asList(testProduct);
        Page<Product> productPage = new PageImpl<>(products);
        Pageable pageable = mock(Pageable.class);
        
        when(productRepository.findProductsWithFilters(
            anyString(), any(), any(), any(), anyString(), any(), any(), any()))
            .thenReturn(productPage);
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        Page<ProductResponse> result = productService.getAllProducts(
            null, null, null, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        verify(productRepository).findProductsWithFilters(
            eq(""), isNull(), isNull(), isNull(), isNull(), 
            isNull(), isNull(), eq(pageable));
    }

    @Test
    void getProductById_WithValidId_ShouldReturnProduct() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        ProductResponse result = productService.getProductById(1L);

        // Then
        assertNotNull(result);
        assertEquals(testProductResponse.getTitle(), result.getTitle());
        verify(productRepository).findById(1L);
        verify(productMapper).productToProductResponse(testProduct);
    }

    @Test
    void getProductById_WithInvalidId_ShouldThrowNotFoundException() {
        // Given
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        NotFoundException exception = assertThrows(NotFoundException.class, 
            () -> productService.getProductById(999L));
        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(productRepository).findById(999L);
    }

    @Test
    void createProduct_ShouldCreateAndReturnProduct() {
        // Given
        when(productMapper.productRequestToProduct(testProductRequest)).thenReturn(testProduct);
        when(productRepository.save(testProduct)).thenReturn(testProduct);
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        ProductResponse result = productService.createProduct(testProductRequest);

        // Then
        assertNotNull(result);
        assertEquals(testProductResponse.getTitle(), result.getTitle());
        verify(productMapper).productRequestToProduct(testProductRequest);
        verify(productRepository).save(testProduct);
        verify(productMapper).productToProductResponse(testProduct);
    }

    @Test
    void updateProduct_WithValidId_ShouldUpdateAndReturnProduct() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(testProduct)).thenReturn(testProduct);
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        ProductResponse result = productService.updateProduct(1L, testProductRequest);

        // Then
        assertNotNull(result);
        assertEquals(testProductRequest.getTitle(), testProduct.getTitle());
        assertEquals(testProductRequest.getDescription(), testProduct.getDescription());
        assertEquals(testProductRequest.getAmount(), testProduct.getAmount());
        verify(productRepository).findById(1L);
        verify(productRepository).save(testProduct);
    }

    @Test
    void updateProduct_WithInvalidId_ShouldThrowNotFoundException() {
        // Given
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        NotFoundException exception = assertThrows(NotFoundException.class, 
            () -> productService.updateProduct(999L, testProductRequest));
        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(productRepository).findById(999L);
        verify(productRepository, never()).save(any());
    }

    @Test
    void updateProductStatus_WithValidId_ShouldUpdateStatusAndReturnProduct() {
        // Given
        ProductStatusRequest statusRequest = new ProductStatusRequest();
        statusRequest.setStatus(Product.ProductStatus.REJECTED);
        
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(testProduct)).thenReturn(testProduct);
        when(productMapper.productToProductResponse(testProduct)).thenReturn(testProductResponse);

        // When
        ProductResponse result = productService.updateProductStatus(1L, statusRequest);

        // Then
        assertNotNull(result);
        assertEquals(Product.ProductStatus.REJECTED, testProduct.getStatus());
        assertNotNull(testProduct.getReviewedAt());
        assertEquals("system", testProduct.getReviewedBy());
        verify(productRepository).findById(1L);
        verify(productRepository).save(testProduct);
    }

    @Test
    void updateProductStatus_WithInvalidId_ShouldThrowNotFoundException() {
        // Given
        ProductStatusRequest statusRequest = new ProductStatusRequest();
        statusRequest.setStatus(Product.ProductStatus.REJECTED);
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        NotFoundException exception = assertThrows(NotFoundException.class, 
            () -> productService.updateProductStatus(999L, statusRequest));
        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(productRepository).findById(999L);
        verify(productRepository, never()).save(any());
    }

    @Test
    void deleteProduct_WithValidId_ShouldDeleteProduct() {
        // Given
        when(productRepository.existsById(1L)).thenReturn(true);

        // When
        productService.deleteProduct(1L);

        // Then
        verify(productRepository).existsById(1L);
        verify(productRepository).deleteById(1L);
    }

    @Test
    void deleteProduct_WithInvalidId_ShouldThrowNotFoundException() {
        // Given
        when(productRepository.existsById(999L)).thenReturn(false);

        // When & Then
        NotFoundException exception = assertThrows(NotFoundException.class, 
            () -> productService.deleteProduct(999L));
        assertEquals("Product not found with id: 999", exception.getMessage());
        verify(productRepository).existsById(999L);
        verify(productRepository, never()).deleteById(any());
    }
}
