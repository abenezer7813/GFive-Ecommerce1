package org.wldu.webservices.services.imp;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.Cart;
import org.wldu.webservices.entities.CartItem;
import org.wldu.webservices.entities.Product;
import org.wldu.webservices.repositories.CartItemRepository;
import org.wldu.webservices.repositories.CartRepository;
import org.wldu.webservices.repositories.ProductRepository;
import org.wldu.webservices.services.contrats.CartService;

@Service
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

    @Override
    @Transactional
    public void addToCart(User user, Long productId, int quantity) {
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
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setProduct(product);
                    newItem.setQuantity(0);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + quantity);
        cartItemRepository.save(item);
    }
}
