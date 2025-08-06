package com.sysco.product_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;
import com.sysco.product_service.dto.response.ProductResponse;
import com.sysco.product_service.entity.Product;
import com.sysco.product_service.exception.NotFoundException;
import com.sysco.product_service.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    private ProductResponse testProductResponse;
    private ProductRequest testProductRequest;

    @BeforeEach
    void setUp() {
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
    void getProducts_ShouldReturnPageOfProducts() throws Exception {
        // Given
        List<ProductResponse> products = Arrays.asList(testProductResponse);
        Page<ProductResponse> productPage = new PageImpl<>(products);
        
        when(productService.getAllProducts(
            anyString(), any(), anyString(), anyString(), anyString(), 
            any(), any(), any())).thenReturn(productPage);

        // When & Then
        mockMvc.perform(get("/api/v1/products")
                .param("page", "0")
                .param("size", "10")
                .param("q", "test")
                .param("category", "1")
                .param("amountType", "KG")
                .param("status", "ACCEPTED")
                .param("sellerId", "seller123")
                .param("minPrice", "10.0")
                .param("maxPrice", "100.0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].title").value("Test Product"))
                .andExpect(jsonPath("$.data.content[0].amount").value(10.50));

        verify(productService).getAllProducts(
            eq("test"), eq(1L), eq("KG"), eq("ACCEPTED"), eq("seller123"),
            eq(new BigDecimal("10.0")), eq(new BigDecimal("100.0")), any());
    }

    @Test
    void getProducts_WithDefaultParams_ShouldReturnProducts() throws Exception {
        // Given
        List<ProductResponse> products = Arrays.asList(testProductResponse);
        Page<ProductResponse> productPage = new PageImpl<>(products);
        
        when(productService.getAllProducts(
            anyString(), any(), anyString(), anyString(), anyString(), 
            any(), any(), any())).thenReturn(productPage);

        // When & Then
        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        verify(productService).getAllProducts(
            eq(""), isNull(), isNull(), isNull(), isNull(),
            isNull(), isNull(), any());
    }

    @Test
    void getProductById_WithValidId_ShouldReturnProduct() throws Exception {
        // Given
        when(productService.getProductById(1L)).thenReturn(testProductResponse);

        // When & Then
        mockMvc.perform(get("/api/v1/products/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Test Product"))
                .andExpect(jsonPath("$.data.id").value(1));

        verify(productService).getProductById(1L);
    }

    @Test
    void getProductById_WithInvalidId_ShouldReturnNotFound() throws Exception {
        // Given
        when(productService.getProductById(999L))
            .thenThrow(new NotFoundException("Product not found with id: 999"));

        // When & Then
        mockMvc.perform(get("/api/v1/products/{id}", 999L))
                .andExpect(status().isNotFound());

        verify(productService).getProductById(999L);
    }

    @Test
    void createProduct_WithValidData_ShouldCreateProduct() throws Exception {
        // Given
        when(productService.createProduct(any(ProductRequest.class)))
            .thenReturn(testProductResponse);

        // When & Then
        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testProductRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Test Product"));

        verify(productService).createProduct(any(ProductRequest.class));
    }

    @Test
    void updateProduct_WithValidData_ShouldUpdateProduct() throws Exception {
        // Given
        testProductResponse.setTitle("Updated Product");
        when(productService.updateProduct(eq(1L), any(ProductRequest.class)))
            .thenReturn(testProductResponse);

        // When & Then
        mockMvc.perform(put("/api/v1/products/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testProductRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Updated Product"));

        verify(productService).updateProduct(eq(1L), any(ProductRequest.class));
    }

    @Test
    void updateProduct_WithInvalidId_ShouldReturnNotFound() throws Exception {
        // Given
        when(productService.updateProduct(eq(999L), any(ProductRequest.class)))
            .thenThrow(new NotFoundException("Product not found with id: 999"));

        // When & Then
        mockMvc.perform(put("/api/v1/products/{id}", 999L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testProductRequest)))
                .andExpect(status().isNotFound());

        verify(productService).updateProduct(eq(999L), any(ProductRequest.class));
    }

    @Test
    void updateProductStatus_WithValidData_ShouldUpdateStatus() throws Exception {
        // Given
        ProductStatusRequest statusRequest = new ProductStatusRequest();
        statusRequest.setStatus(Product.ProductStatus.REJECTED);
        
        testProductResponse.setStatus(Product.ProductStatus.REJECTED);
        when(productService.updateProductStatus(eq(1L), any(ProductStatusRequest.class)))
            .thenReturn(testProductResponse);

        // When & Then
        mockMvc.perform(patch("/api/v1/products/{id}/status", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(statusRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("REJECTED"));

        verify(productService).updateProductStatus(eq(1L), any(ProductStatusRequest.class));
    }

    @Test
    void deleteProduct_WithValidId_ShouldDeleteProduct() throws Exception {
        // Given
        doNothing().when(productService).deleteProduct(1L);

        // When & Then
        mockMvc.perform(delete("/api/v1/products/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(productService).deleteProduct(1L);
    }

    @Test
    void deleteProduct_WithInvalidId_ShouldReturnNotFound() throws Exception {
        // Given
        doThrow(new NotFoundException("Product not found with id: 999"))
            .when(productService).deleteProduct(999L);

        // When & Then
        mockMvc.perform(delete("/api/v1/products/{id}", 999L))
                .andExpect(status().isNotFound());

        verify(productService).deleteProduct(999L);
    }
}
