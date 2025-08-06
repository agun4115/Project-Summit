package com.sysco.product_service.repository;

import com.sysco.product_service.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
@Query("SELECT p FROM Product p WHERE " +
       "(:q IS NULL OR (LOWER(p.title) LIKE CONCAT('%', :q, '%') OR LOWER(p.description) LIKE CONCAT('%', :q, '%'))) AND " +
       "(:category IS NULL OR p.categoryId = :category) AND " +
       "(:amountType IS NULL OR p.amountType = :amountType) AND " +
       "(:status IS NULL OR p.status = :status) AND " +
       "(:sellerId IS NULL OR p.sellerId = :sellerId) AND " +
       "(:minPrice IS NULL OR p.pricePerUnit >= :minPrice) AND " +
       "(:maxPrice IS NULL OR p.pricePerUnit <= :maxPrice)")
Page<Product> findProductsWithFilters(
    @Param("q") String q,
    @Param("category") Long category,
    @Param("amountType") Product.AmountType amountType,
    @Param("status") Product.ProductStatus status,
    @Param("sellerId") String sellerId,
    @Param("minPrice") BigDecimal minPrice,
    @Param("maxPrice") BigDecimal maxPrice,
    Pageable pageable
);
}
