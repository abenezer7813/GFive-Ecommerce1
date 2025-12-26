package org.wldu.webservices.services.imp;

import org.wldu.webservices.dto.product.ProductRequestDTO;
import org.springframework.stereotype.Service;
import org.wldu.webservices.enities.CategoriesEntity;
import org.wldu.webservices.enities.Product;
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
}
