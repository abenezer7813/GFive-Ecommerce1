package org.wldu.webservices.services.imp;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.wldu.webservices.dto.category.CategoryRequestDto;
import org.wldu.webservices.dto.category.CategoryResponseDto;
import org.wldu.webservices.entities.CategoriesEntity;
import org.wldu.webservices.repositories.CategoryRepository;
import org.wldu.webservices.services.contrats.CategoryServiceInt;

@Service
public class CategoryService implements CategoryServiceInt {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // ADMIN
    public CategoryResponseDto createCategory(CategoryRequestDto request) {

        categoryRepository.findByName(request.getName())
                .ifPresent(c -> {
                    throw new RuntimeException("Category already exists");
                });

        CategoriesEntity category = new CategoriesEntity();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        CategoriesEntity saved = categoryRepository.save(category);

        return new CategoryResponseDto(saved.getId(), saved.getName(),saved.getDescription());
}

// PUBLIC
public Page<CategoryResponseDto> getAllCategories(Pageable pageable) {
    return categoryRepository.findAll(pageable)
            .map(c -> new CategoryResponseDto(
                    c.getId(),
                    c.getName(),
                    c.getDescription()
            ));
}

    // PUBLIC
    public CategoryResponseDto getCategory(Long id) {
        CategoriesEntity c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return new CategoryResponseDto(c.getId(), c.getName(), c.getDescription());
    }
}
