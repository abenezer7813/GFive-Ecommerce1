package org.wldu.webservices.services.contrats;



import org.wldu.webservices.dto.category.CategoryRequestDto;
import org.wldu.webservices.dto.category.CategoryResponseDto;

import java.util.List;

public interface CategoryServiceInt {

    CategoryResponseDto createCategory(CategoryRequestDto request);

    List<CategoryResponseDto> getAllCategories();

    CategoryResponseDto getCategory(Long id);
}

