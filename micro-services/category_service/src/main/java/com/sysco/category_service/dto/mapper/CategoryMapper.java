package com.sysco.category_service.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.sysco.category_service.dto.response.CategoryResponse;
import com.sysco.category_service.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse categoryToCategoryResponse(Category category);
    List<CategoryResponse> categoriesToCategoryResponses(List<Category> categories);
    
}
