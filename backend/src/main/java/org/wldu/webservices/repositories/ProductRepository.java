package org.wldu.webservices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.enities.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    boolean existsByName(String name);
}
