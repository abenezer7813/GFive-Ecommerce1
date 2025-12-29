package org.wldu.webservices.services.contrats;

import org.wldu.webservices.auths.User;

public interface CartService {
    void addToCart(User user, Long productId, int quantity);
}
