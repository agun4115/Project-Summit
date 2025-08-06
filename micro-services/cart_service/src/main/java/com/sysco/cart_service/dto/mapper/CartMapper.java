package com.sysco.cart_service.dto.mapper;

import com.sysco.cart_service.dto.request.CartRequest;
import com.sysco.cart_service.dto.response.CartResponse;
import com.sysco.cart_service.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartMapper {
    
    CartResponse cartToCartResponse(Cart cart);
    
    @Mapping(target = "userId", ignore = true)  // userId will be set manually in service
    Cart cartRequestToCart(CartRequest cartRequest);
    
    List<CartResponse> cartListToCartResponseList(List<Cart> carts);
}
