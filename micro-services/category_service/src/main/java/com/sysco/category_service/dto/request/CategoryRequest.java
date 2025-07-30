package com.sysco.category_service.dto.request;

import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String imageUrl;
}
