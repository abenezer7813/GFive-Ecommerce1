package org.wldu.webservices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.wldu.webservices.entities.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    boolean existsByName(String name);
    @Query("SELECT COALESCE(SUM(p.stockQuantity), 0) FROM Product p")
    long getTotalStockQuantity();

}
