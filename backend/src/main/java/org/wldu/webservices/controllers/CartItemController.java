package org.wldu.webservices.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.entities.Cart;
import org.wldu.webservices.entities.CartItem;
import org.wldu.webservices.entities.Product;
import org.wldu.webservices.repositories.CartItemRepository;
import org.wldu.webservices.repositories.CartRepository;
import org.wldu.webservices.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        return cartItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCartItem(@RequestBody CartItem cartItem) {
        Optional<Cart> cartOpt = cartRepository.findById(cartItem.getCart().getId());
        if (cartOpt.isEmpty()) return ResponseEntity.badRequest().body("Cart not found");

        Optional<Product> productOpt = productRepository.findById(cartItem.getProduct().getId());
        if (productOpt.isEmpty()) return ResponseEntity.badRequest().body("Product not found");

        cartItem.setCart(cartOpt.get());
        cartItem.setProduct(productOpt.get());

        CartItem savedItem = cartItemRepository.save(cartItem);
        return ResponseEntity.ok(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItemDetails) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(id);
        if (optionalCartItem.isEmpty()) return ResponseEntity.notFound().build();

        Optional<Cart> cartOpt = cartRepository.findById(cartItemDetails.getCart().getId());
        if (cartOpt.isEmpty()) return ResponseEntity.badRequest().body("Cart not found");

        Optional<Product> productOpt = productRepository.findById(cartItemDetails.getProduct().getId());
        if (productOpt.isEmpty()) return ResponseEntity.badRequest().body("Product not found");

        CartItem cartItem = optionalCartItem.get();
        cartItem.setQuantity(cartItemDetails.getQuantity());
        cartItem.setCart(cartOpt.get());
        cartItem.setProduct(productOpt.get());

        CartItem updatedItem = cartItemRepository.save(cartItem);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        if (!cartItemRepository.existsById(id)) return ResponseEntity.notFound().build();
        cartItemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
