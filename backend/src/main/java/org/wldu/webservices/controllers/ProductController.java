package org.wldu.webservices.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.wldu.webservices.dto.product.ProductRequestDTO;
import org.wldu.webservices.dto.product.ProductResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.entities.Product;
import org.wldu.webservices.services.imp.ProductServiceImpl;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    private ProductResponseDTO mapToResponse(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setImageUrl(product.getImageUrl());

        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());

        return dto;
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestBody @Valid ProductRequestDTO request) {

        Product product = productService.createProduct(request);
        return ResponseEntity.ok(new ProductResponseDTO());
    }
    // ✅ ADMIN only
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
       Product product= productService.getProduct(id);
       return ResponseEntity.ok(new ProductResponseDTO(product));
    }

    // ✅ ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        System.out.println("delete product");
        productService.deleteProduct(id);
    }

    // ✅ USER & ADMIN

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public Page<ProductResponseDTO> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        PageRequest pageable = PageRequest.of(page, size, sort);

        return productService.getAllProducts(pageable)
                .map(this::mapToResponse);
    }


    // ✅ USER only
    @PostMapping("/{id}/buy")
    @PreAuthorize("hasRole('USER')")
    public String buyProduct(@PathVariable Long id) {
        productService.buyProduct(id);
        return "Purchase successful";
    }
}


