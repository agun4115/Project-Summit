package com.sysco.category_service.service;

import com.sysco.category_service.dto.mapper.CategoryMapper;
import com.sysco.category_service.dto.response.CategoryResponse;
import com.sysco.category_service.dto.request.CategoryRequest;
import com.sysco.category_service.entity.Category;
import com.sysco.category_service.exception.NotFoundException;
import com.sysco.category_service.repository.CategoryRepository;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    
    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categoryMapper.categoriesToCategoryResponses(categories);
    }

    // @Override
    // public CategoryResponse getCategoryById(Long categoryId) {
    //     Category category = categoryRepository.findById(categoryId)
    //             .orElseThrow(() -> new NotFoundException("Category not found with id: " + categoryId));
    //     return categoryMapper.categoryToCategoryResponse(category);
    // }

    // @Override
    // public CategoryResponse createCategory(CategoryRequest categoryRequest) {
    //     Category category = new Category();
    //     category.setName(categoryRequest.getName());
    //     category.setDescription(categoryRequest.getDescription());
    //     category.setImageUrl(categoryRequest.getImageUrl());
        
    //     Category savedCategory = categoryRepository.save(category);
    //     return categoryMapper.categoryToCategoryResponse(savedCategory);
    // }

    // @Override
    // public CategoryResponse updateCategory(Long categoryId, CategoryRequest updatedCategory) {
    //     Category existing = categoryRepository.findById(categoryId)
    //             .orElseThrow(() -> new NotFoundException("Category not found with id: " + categoryId));

    //     existing.setName(updatedCategory.getName());
    //     existing.setDescription(updatedCategory.getDescription());
    //     existing.setImageUrl(updatedCategory.getImageUrl());

    //     Category saved = categoryRepository.save(existing);
    //     return categoryMapper.categoryToCategoryResponse(saved);
    // }

    // @Override
    // public void deleteCategory(Long categoryId) {
    //     if (!categoryRepository.existsById(categoryId)) {
    //         throw new NotFoundException("Category not found with id: " + categoryId);
    //     }
    //     categoryRepository.deleteById(categoryId);
    // }
}
