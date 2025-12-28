package org.wldu.webservices.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.entities.OrderEntity;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserId(Long userId);
}
