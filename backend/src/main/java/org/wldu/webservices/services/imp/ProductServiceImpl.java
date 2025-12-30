package org.wldu.webservices.services.imp;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.wldu.webservices.dto.product.ProductRequestDTO;
import org.springframework.stereotype.Service;
import org.wldu.webservices.entities.CategoriesEntity;
import org.wldu.webservices.entities.Product;
import org.wldu.webservices.exception.ResourceNotFoundException;
import org.wldu.webservices.repositories.CategoryRepository;
import org.wldu.webservices.repositories.ProductRepository;

import java.util.List;

@Service
public class ProductServiceImpl {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // ✅ ADMIN
    public Product createProduct(ProductRequestDTO productRequest) {

        CategoriesEntity category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setImageUrl(productRequest.getImageUrl());
        product.setStockQuantity(productRequest.getStockQuantity());
           product.setCategory(category);

        return productRepository.save(product);
    }

    // ✅ USER / ADMIN
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ USER / ADMIN
    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    // ✅ USER
    public void buyProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStockQuantity() <= 0) {
            throw new RuntimeException("Out of stock");
        }

        product.setStockQuantity(product.getStockQuantity() - 1);
        productRepository.save(product);
    }

    // ✅ ADMIN
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, ProductRequestDTO request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        // If category can be updated
        if (request.getCategoryId() != null) {
            CategoriesEntity category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        return productRepository.save(product);
    }

}
