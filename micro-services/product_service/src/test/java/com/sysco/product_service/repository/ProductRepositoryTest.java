package com.sysco.product_service.repository;

import com.sysco.product_service.entity.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    private Product testProduct1;
    private Product testProduct2;
    private Product testProduct3;

    @BeforeEach
    void setUp() {
        // Clear repository
        productRepository.deleteAll();

        testProduct1 = new Product();
        testProduct1.setTitle("Apple Juice");
        testProduct1.setDescription("Fresh apple juice");
        testProduct1.setAmount(new BigDecimal("1.0"));
        testProduct1.setAmountType(Product.AmountType.L);
        testProduct1.setPricePerUnit(new BigDecimal("15.99"));
        testProduct1.setCategoryId(1L);
        testProduct1.setStatus(Product.ProductStatus.ACCEPTED);
        testProduct1.setSellerId("seller1");
        testProduct1.setCreatedAt(LocalDateTime.now());
        testProduct1.setUpdatedAt(LocalDateTime.now());

        testProduct2 = new Product();
        testProduct2.setTitle("Banana Pack");
        testProduct2.setDescription("Fresh bananas");
        testProduct2.setAmount(new BigDecimal("2.5"));
        testProduct2.setAmountType(Product.AmountType.KG);
        testProduct2.setPricePerUnit(new BigDecimal("8.50"));
        testProduct2.setCategoryId(2L);
        testProduct2.setStatus(Product.ProductStatus.REJECTED);
        testProduct2.setSellerId("seller2");
        testProduct2.setCreatedAt(LocalDateTime.now());
        testProduct2.setUpdatedAt(LocalDateTime.now());

        testProduct3 = new Product();
        testProduct3.setTitle("Orange Box");
        testProduct3.setDescription("Box of oranges");
        testProduct3.setAmount(new BigDecimal("12"));
        testProduct3.setAmountType(Product.AmountType.ITEMS);
        testProduct3.setPricePerUnit(new BigDecimal("25.00"));
        testProduct3.setCategoryId(1L);
        testProduct3.setStatus(Product.ProductStatus.ACCEPTED);
        testProduct3.setSellerId("seller1");
        testProduct3.setCreatedAt(LocalDateTime.now());
        testProduct3.setUpdatedAt(LocalDateTime.now());

        // Save test data
        productRepository.saveAll(Arrays.asList(testProduct1, testProduct2, testProduct3));
    }

    @Test
    void findProductsWithFilters_WithNoFilters_ShouldReturnAllProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, null, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(3, result.getTotalElements());
    }

    @Test
    void findProductsWithFilters_WithQueryFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "apple", null, null, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Apple Juice", result.getContent().get(0).getTitle());
    }

    @Test
    void findProductsWithFilters_WithCategoryFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", 1L, null, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
            .allMatch(p -> p.getCategoryId().equals(1L)));
    }

    @Test
    void findProductsWithFilters_WithAmountTypeFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, Product.AmountType.KG, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(Product.AmountType.KG, result.getContent().get(0).getAmountType());
    }

    @Test
    void findProductsWithFilters_WithStatusFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, null, Product.ProductStatus.ACCEPTED, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
            .allMatch(p -> p.getStatus().equals(Product.ProductStatus.ACCEPTED)));
    }

    @Test
    void findProductsWithFilters_WithSellerFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, null, null, "seller1", null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
            .allMatch(p -> p.getSellerId().equals("seller1")));
    }

    @Test
    void findProductsWithFilters_WithPriceRangeFilter_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        BigDecimal minPrice = new BigDecimal("10.00");
        BigDecimal maxPrice = new BigDecimal("20.00");

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, null, null, null, minPrice, maxPrice, pageable);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        Product product = result.getContent().get(0);
        assertTrue(product.getPricePerUnit().compareTo(minPrice) >= 0);
        assertTrue(product.getPricePerUnit().compareTo(maxPrice) <= 0);
    }

    @Test
    void findProductsWithFilters_WithMultipleFilters_ShouldReturnMatchingProducts() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", 1L, null, Product.ProductStatus.ACCEPTED, "seller1", null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
            .allMatch(p -> p.getCategoryId().equals(1L) && 
                          p.getStatus().equals(Product.ProductStatus.ACCEPTED) &&
                          p.getSellerId().equals("seller1")));
    }

    @Test
    void findProductsWithFilters_WithPagination_ShouldReturnCorrectPage() {
        // Given
        Pageable pageable = PageRequest.of(0, 2);

        // When
        Page<Product> result = productRepository.findProductsWithFilters(
            "", null, null, null, null, null, null, pageable);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getContent().size());
        assertEquals(3, result.getTotalElements());
        assertEquals(2, result.getTotalPages());
    }

    @Test
    void findById_WithValidId_ShouldReturnProduct() {
        // Given
        Long productId = testProduct1.getId();

        // When
        Optional<Product> result = productRepository.findById(productId);

        // Then
        assertTrue(result.isPresent());
        assertEquals("Apple Juice", result.get().getTitle());
    }

    @Test
    void findById_WithInvalidId_ShouldReturnEmpty() {
        // When
        Optional<Product> result = productRepository.findById(999L);

        // Then
        assertFalse(result.isPresent());
    }

    @Test
    void save_ShouldPersistProduct() {
        // Given
        Product newProduct = new Product();
        newProduct.setTitle("New Product");
        newProduct.setDescription("New Description");
        newProduct.setAmount(new BigDecimal("5.0"));
        newProduct.setAmountType(Product.AmountType.L);
        newProduct.setPricePerUnit(new BigDecimal("12.99"));
        newProduct.setCategoryId(3L);
        newProduct.setStatus(Product.ProductStatus.ACCEPTED);
        newProduct.setSellerId("seller3");
        newProduct.setCreatedAt(LocalDateTime.now());
        newProduct.setUpdatedAt(LocalDateTime.now());

        // When
        Product saved = productRepository.save(newProduct);

        // Then
        assertNotNull(saved.getId());
        assertEquals("New Product", saved.getTitle());
        
        // Verify it's persisted
        Optional<Product> found = productRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals("New Product", found.get().getTitle());
    }

    @Test
    void deleteById_ShouldRemoveProduct() {
        // Given
        Long productId = testProduct1.getId();
        assertTrue(productRepository.existsById(productId));

        // When
        productRepository.deleteById(productId);

        // Then
        assertFalse(productRepository.existsById(productId));
    }

    @Test
    void existsById_WithValidId_ShouldReturnTrue() {
        // Given
        Long productId = testProduct1.getId();

        // When
        boolean exists = productRepository.existsById(productId);

        // Then
        assertTrue(exists);
    }

    @Test
    void existsById_WithInvalidId_ShouldReturnFalse() {
        // When
        boolean exists = productRepository.existsById(999L);

        // Then
        assertFalse(exists);
    }
}
