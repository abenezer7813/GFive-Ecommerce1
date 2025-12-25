package org.wldu.webservices.controllers;

import org.wldu.webservices.dto.product.ProductRequestDTO;
import org.wldu.webservices.dto.product.ProductResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.enities.Product;
import org.wldu.webservices.services.imp.ProductServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestBody @Valid ProductRequestDTO request) {

        Product product = productService.createProduct(request);
        return ResponseEntity.ok(new ProductResponseDTO(product));
    }
    // ✅ ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.getProduct(id);
    }

    // ✅ USER & ADMIN
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    // ✅ USER only
    @PostMapping("/{id}/buy")
    @PreAuthorize("hasRole('USER')")
    public String buyProduct(@PathVariable Long id) {
        productService.buyProduct(id);
        return "Purchase successful";
    }
}


