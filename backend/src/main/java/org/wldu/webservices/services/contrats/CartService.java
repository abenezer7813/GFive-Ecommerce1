package org.wldu.webservices.services.contrats;


import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.Cart;


public interface CartService {

    Cart addToCart(User user, Long productId, int quantity);
    Cart getCartForUser(User user);
    Cart updateCartItem(User user, Long productId, int quantity);
    Cart removeCartItem(User user, Long productId);
}

