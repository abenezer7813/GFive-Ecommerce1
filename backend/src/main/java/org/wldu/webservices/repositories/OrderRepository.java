package org.wldu.webservices.repositories;



import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.wldu.webservices.entities.OrderEntity;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserId(Long userId);

    // New method for latest orders
    List<OrderEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
