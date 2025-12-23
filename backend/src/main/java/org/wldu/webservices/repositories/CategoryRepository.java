package org.wldu.webservices.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.enities.Category;



public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);

}

