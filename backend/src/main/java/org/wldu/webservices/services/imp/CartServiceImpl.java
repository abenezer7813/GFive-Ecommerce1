package org.wldu.webservices.services.imp;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.wldu.webservices.entities.Cart;
import org.wldu.webservices.entities.CartItem;
import org.wldu.webservices.entities.Product;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.repositories.CartItemRepository;
import org.wldu.webservices.repositories.CartRepository;
import org.wldu.webservices.repositories.ProductRepository;
import org.wldu.webservices.services.contrats.CartService;

@Service  // ✅ SPRING SERVICE
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Cart addToCart(User user, Long productId, int quantity) {

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), productId)
                .orElseGet(() -> {
                    CartItem ci = new CartItem();
                    ci.setCart(cart);
                    ci.setProduct(product);
                    ci.setQuantity(0);
                    return ci;
                });

        item.setQuantity(item.getQuantity() + quantity);
        cartItemRepository.save(item);
        return cart;
    }
    @Transactional
    public Cart getCartForUser(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }
    public Cart updateCartItem(User user, Long productId, int quantity) {
        Cart cart = getCartForUser(user);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        item.setQuantity(quantity);
        return cartRepository.save(cart);
    }
    public Cart removeCartItem(User user, Long productId) {
        Cart cart = getCartForUser(user);

        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));

        return cartRepository.save(cart);
    }

}
