package org.wldu.webservices.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.wldu.webservices.dto.category.CategoryRequestDto;
import org.wldu.webservices.dto.category.CategoryResponseDto;
import org.wldu.webservices.services.imp.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // ADMIN ONLY
@PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryResponseDto> create(
            @RequestBody CategoryRequestDto request) {

        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    // PUBLIC
    @GetMapping("")
    public
    Page<CategoryResponseDto> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                direction.equalsIgnoreCase("desc")
                        ? Sort.by(sortBy).descending()
                        : Sort.by(sortBy).ascending()
        );

        return categoryService.getAllCategories(pageable);
    }


    // PUBLIC
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategory(id));
    }
}
