package com.sysco.cart_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "cart", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "count", nullable = false)
    private Integer count;
}
