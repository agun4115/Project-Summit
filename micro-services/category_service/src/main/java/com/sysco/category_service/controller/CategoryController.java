package com.sysco.category_service.controller;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sysco.category_service.dto.response.CategoryResponse;
import com.sysco.category_service.service.CategoryService;
import com.sysco.category_service.dto.request.CategoryRequest;

// @AllArgsConstructor
@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins = {
    "http://localhost:9001",
}, allowCredentials = "true")
@Slf4j
public class CategoryController extends AbstractController {

    private final CategoryService categoryService;
    
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("")    
    public ResponseEntity<?> getCategories(){
        List<CategoryResponse> categories = categoryService.getAllCategories(); 
        return createSuccessResponse("Categories retrieved successfully", categories, HttpStatus.OK);
    }

    // @PostMapping("")
    // public ResponseEntity<?> createCategory(@RequestBody CategoryRequest request) {
    //     logRequest("Create Category", request);
    //     CategoryResponse created = categoryService.createCategory(request);
    //     return createSuccessResponse("Category created successfully", created, HttpStatus.CREATED);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryRequest request) {
    //     CategoryResponse updated = categoryService.updateCategory(id, request);
    //     return createSuccessResponse("Category updated successfully", updated, HttpStatus.OK);
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
    //     categoryService.deleteCategory(id);
    //     return createSuccessResponse("Category deleted successfully", null, HttpStatus.OK);
    // }

}
