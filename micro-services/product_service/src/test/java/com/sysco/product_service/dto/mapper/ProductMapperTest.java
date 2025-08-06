package com.sysco.product_service.dto.mapper;

import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.entity.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {ProductMapperImpl.class})
class ProductMapperTest {

    @Autowired
    private ProductMapper productMapper;

    private Product testProduct;
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
        testProduct.setReviewedBy("reviewer1");
        testProduct.setCreatedAt(LocalDateTime.now());
        testProduct.setUpdatedAt(LocalDateTime.now());
        testProduct.setReviewedAt(LocalDateTime.now());
        testProduct.setImages(Arrays.asList("image1.jpg", "image2.jpg"));

        testProductRequest = new ProductRequest();
        testProductRequest.setTitle("New Product");
        testProductRequest.setDescription("New Description");
        testProductRequest.setAmount(new BigDecimal("5.25"));
        testProductRequest.setAmountType("L");
        testProductRequest.setPricePerUnit(new BigDecimal("15.50"));
        testProductRequest.setCategoryId(2L);
        testProductRequest.setSellerId("newSeller");
        testProductRequest.setImages(Arrays.asList("newImage1.jpg", "newImage2.jpg"));
    }

    @Test
    void productToProductResponse_ShouldMapAllFields() {
        // When
        ProductResponse result = productMapper.productToProductResponse(testProduct);

        // Then
        assertNotNull(result);
        assertEquals(testProduct.getId(), result.getId());
        assertEquals(testProduct.getTitle(), result.getTitle());
        assertEquals(testProduct.getDescription(), result.getDescription());
        assertEquals(testProduct.getAmount(), result.getAmount());
        assertEquals(testProduct.getAmountType().name(), result.getAmountType());
        assertEquals(testProduct.getPricePerUnit(), result.getPricePerUnit());
        assertEquals(testProduct.getCategoryId(), result.getCategoryId());
        assertEquals(testProduct.getStatus(), result.getStatus());
        assertEquals(testProduct.getReviewedBy(), result.getReviewedBy());
        assertEquals(testProduct.getCreatedAt(), result.getCreatedAt());
        assertEquals(testProduct.getUpdatedAt(), result.getUpdatedAt());
        assertEquals(testProduct.getReviewedAt(), result.getReviewedAt());
        assertEquals(testProduct.getImages(), result.getImages());
    }

    @Test
    void productToProductResponse_WithNullProduct_ShouldReturnNull() {
        // When
        ProductResponse result = productMapper.productToProductResponse(null);

        // Then
        assertNull(result);
    }

    @Test
    void productsToProductResponses_ShouldMapAllProducts() {
        // Given
        Product product2 = new Product();
        product2.setId(2L);
        product2.setTitle("Second Product");
        product2.setAmountType(Product.AmountType.ITEMS);
        product2.setStatus(Product.ProductStatus.REJECTED);
        
        List<Product> products = Arrays.asList(testProduct, product2);

        // When
        List<ProductResponse> result = productMapper.productsToProductResponses(products);

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        
        ProductResponse first = result.get(0);
        assertEquals(testProduct.getId(), first.getId());
        assertEquals(testProduct.getTitle(), first.getTitle());
        assertEquals("KG", first.getAmountType());
        
        ProductResponse second = result.get(1);
        assertEquals(product2.getId(), second.getId());
        assertEquals(product2.getTitle(), second.getTitle());
        assertEquals("ITEMS", second.getAmountType());
    }

    @Test
    void productsToProductResponses_WithEmptyList_ShouldReturnEmptyList() {
        // Given
        List<Product> products = Arrays.asList();

        // When
        List<ProductResponse> result = productMapper.productsToProductResponses(products);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void productRequestToProduct_ShouldMapAllFields() {
        // When
        Product result = productMapper.productRequestToProduct(testProductRequest);

        // Then
        assertNotNull(result);
        assertEquals(testProductRequest.getTitle(), result.getTitle());
        assertEquals(testProductRequest.getDescription(), result.getDescription());
        assertEquals(testProductRequest.getAmount(), result.getAmount());
        assertEquals(Product.AmountType.L, result.getAmountType());
        assertEquals(testProductRequest.getPricePerUnit(), result.getPricePerUnit());
        assertEquals(testProductRequest.getCategoryId(), result.getCategoryId());
        assertEquals(testProductRequest.getSellerId(), result.getSellerId());
        assertEquals(testProductRequest.getImages(), result.getImages());
        
        // ID should not be mapped (it's generated)
        assertNull(result.getId());
    }

    @Test
    void productRequestToProduct_WithNullRequest_ShouldReturnNull() {
        // When
        Product result = productMapper.productRequestToProduct(null);

        // Then
        assertNull(result);
    }

    @Test
    void productRequestToProduct_WithDifferentAmountTypes_ShouldMapCorrectly() {
        // Test KG
        testProductRequest.setAmountType("KG");
        Product resultKG = productMapper.productRequestToProduct(testProductRequest);
        assertEquals(Product.AmountType.KG, resultKG.getAmountType());

        // Test ITEMS
        testProductRequest.setAmountType("ITEMS");
        Product resultItems = productMapper.productRequestToProduct(testProductRequest);
        assertEquals(Product.AmountType.ITEMS, resultItems.getAmountType());

        // Test L
        testProductRequest.setAmountType("L");
        Product resultL = productMapper.productRequestToProduct(testProductRequest);
        assertEquals(Product.AmountType.L, resultL.getAmountType());
    }
}
