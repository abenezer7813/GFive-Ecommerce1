package org.wldu.webservices.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.entities.CategoriesEntity;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoriesEntity, Long> {



    Optional<CategoriesEntity> findByName(String name);
}


