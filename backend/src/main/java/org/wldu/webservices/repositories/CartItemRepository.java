package org.wldu.webservices.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.wldu.webservices.enities.CartItem;

import java.util.Optional;

public interface CartItemRepository
        extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}
