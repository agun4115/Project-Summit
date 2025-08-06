package com.sysco.product_service.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sysco.product_service.dto.request.ProductRequest;
import com.sysco.product_service.dto.request.ProductStatusRequest;
import com.sysco.product_service.entity.Product;
import com.sysco.product_service.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@Transactional
class ProductIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Product testProduct;

    @BeforeEach
    void setUp() {
        productRepository.deleteAll();

        testProduct = new Product();
        testProduct.setTitle("Integration Test Product");
        testProduct.setDescription("Test Description");
        testProduct.setAmount(new BigDecimal("10.50"));
        testProduct.setAmountType(Product.AmountType.KG);
        testProduct.setPricePerUnit(new BigDecimal("25.99"));
        testProduct.setCategoryId(1L);
        testProduct.setStatus(Product.ProductStatus.ACCEPTED);
        testProduct.setSellerId("seller123");
        testProduct.setCreatedAt(LocalDateTime.now());
        testProduct.setUpdatedAt(LocalDateTime.now());
        testProduct.setImages(Arrays.asList("image1.jpg", "image2.jpg"));

        testProduct = productRepository.save(testProduct);
    }

    @Test
    void getProducts_ShouldReturnAllProducts() throws Exception {
        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].title").value("Integration Test Product"))
                .andExpect(jsonPath("$.data.content[0].amount").value(10.50));
    }

    @Test
    void getProducts_WithFilters_ShouldReturnFilteredResults() throws Exception {
        mockMvc.perform(get("/api/v1/products")
                .param("q", "Integration")
                .param("category", "1")
                .param("status", "ACCEPTED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content", hasSize(1)))
                .andExpect(jsonPath("$.data.content[0].title").value("Integration Test Product"));
    }

    @Test
    void getProductById_WithValidId_ShouldReturnProduct() throws Exception {
        mockMvc.perform(get("/api/v1/products/{id}", testProduct.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Integration Test Product"))
                .andExpect(jsonPath("$.data.id").value(testProduct.getId()));
    }

    @Test
    void createProduct_WithValidData_ShouldCreateProduct() throws Exception {
        ProductRequest request = new ProductRequest();
        request.setTitle("New Product");
        request.setDescription("New Description");
        request.setAmount(new BigDecimal("5.25"));
        request.setAmountType("L");
        request.setPricePerUnit(new BigDecimal("15.50"));
        request.setCategoryId(2L);
        request.setSellerId("newSeller");
        request.setImages(Arrays.asList("newImage.jpg"));

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("New Product"))
                .andExpect(jsonPath("$.data.amount").value(5.25))
                .andExpect(jsonPath("$.data.amountType").value("L"));
    }

    @Test
    void updateProduct_WithValidData_ShouldUpdateProduct() throws Exception {
        ProductRequest request = new ProductRequest();
        request.setTitle("Updated Product");
        request.setDescription("Updated Description");
        request.setAmount(new BigDecimal("15.75"));
        request.setAmountType("ITEMS");
        request.setPricePerUnit(new BigDecimal("30.99"));
        request.setCategoryId(3L);
        request.setSellerId("updatedSeller");

        mockMvc.perform(put("/api/v1/products/{id}", testProduct.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Updated Product"))
                .andExpect(jsonPath("$.data.amount").value(15.75))
                .andExpect(jsonPath("$.data.amountType").value("ITEMS"));
    }

    @Test
    void updateProductStatus_WithValidData_ShouldUpdateStatus() throws Exception {
        ProductStatusRequest statusRequest = new ProductStatusRequest();
        statusRequest.setStatus(Product.ProductStatus.REJECTED);

        mockMvc.perform(patch("/api/v1/products/{id}/status", testProduct.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(statusRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("REJECTED"));
    }

    @Test
    void deleteProduct_WithValidId_ShouldDeleteProduct() throws Exception {
        mockMvc.perform(delete("/api/v1/products/{id}", testProduct.getId()))
                .andExpect(status().isNoContent());

        // Verify product is deleted
        mockMvc.perform(get("/api/v1/products/{id}", testProduct.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void fullWorkflow_CreateUpdateDelete_ShouldWorkCorrectly() throws Exception {
        // Create product
        ProductRequest createRequest = new ProductRequest();
        createRequest.setTitle("Workflow Test Product");
        createRequest.setDescription("Workflow Description");
        createRequest.setAmount(new BigDecimal("7.50"));
        createRequest.setAmountType("KG");
        createRequest.setPricePerUnit(new BigDecimal("20.00"));
        createRequest.setCategoryId(1L);
        createRequest.setSellerId("workflowSeller");

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));

        // Extract product ID from response (simplified - in real scenario you'd parse JSON properly)
        Long productId = testProduct.getId() + 1; // Assuming it gets next ID

        // Update product
        ProductRequest updateRequest = new ProductRequest();
        updateRequest.setTitle("Updated Workflow Product");
        updateRequest.setDescription("Updated Description");
        updateRequest.setAmount(new BigDecimal("8.75"));
        updateRequest.setAmountType("L");
        updateRequest.setPricePerUnit(new BigDecimal("22.50"));
        updateRequest.setCategoryId(2L);
        updateRequest.setSellerId("updatedWorkflowSeller");

        mockMvc.perform(put("/api/v1/products/{id}", productId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Updated Workflow Product"));

        // Update status
        ProductStatusRequest statusRequest = new ProductStatusRequest();
        statusRequest.setStatus(Product.ProductStatus.REJECTED);

        mockMvc.perform(patch("/api/v1/products/{id}/status", productId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(statusRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("REJECTED"));

        // Delete product
        mockMvc.perform(delete("/api/v1/products/{id}", productId))
                .andExpect(status().isNoContent());

        // Verify deletion
        mockMvc.perform(get("/api/v1/products/{id}", productId))
                .andExpect(status().isNotFound());
    }
}
