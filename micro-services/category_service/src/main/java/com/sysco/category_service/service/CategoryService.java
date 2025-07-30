package com.sysco.category_service.service;

import java.util.List;

import com.sysco.category_service.dto.request.CategoryRequest;
import com.sysco.category_service.dto.response.CategoryResponse;
import com.sysco.category_service.entity.Category;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    // CategoryResponse getCategoryById(Long categoryId);

    // CategoryResponse createCategory(CategoryRequest categoryRequest);

    // CategoryResponse updateCategory(Long categoryId, CategoryRequest category);

    // void deleteCategory(Long categoryId);

}
