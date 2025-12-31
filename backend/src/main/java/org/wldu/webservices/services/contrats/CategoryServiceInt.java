package org.wldu.webservices.services.contrats;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.wldu.webservices.dto.category.CategoryRequestDto;
import org.wldu.webservices.dto.category.CategoryResponseDto;

import java.util.List;

public interface CategoryServiceInt {

    CategoryResponseDto createCategory(CategoryRequestDto request);

    Page<CategoryResponseDto> getAllCategories(Pageable pageable);

    CategoryResponseDto getCategory(Long id);
    CategoryResponseDto updateCategory(Long id, CategoryRequestDto request);
    void deleteCategory(Long id);
}

