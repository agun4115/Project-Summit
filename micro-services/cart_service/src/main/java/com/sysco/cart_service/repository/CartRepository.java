package com.sysco.cart_service.repository;

import com.sysco.cart_service.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    List<Cart> findByUserId(String userId);
    
    Optional<Cart> findByUserIdAndProductId(String userId, Long productId);
    
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.userId = :userId")
    void deleteByUserId(@Param("userId") String userId);
    
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.userId = :userId AND c.productId = :productId")
    void deleteByUserIdAndProductId(@Param("userId") String userId, @Param("productId") Long productId);
}
