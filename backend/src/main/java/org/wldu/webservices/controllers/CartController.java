package org.wldu.webservices.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.services.contrats.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(
            @AuthenticationPrincipal User user,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        cartService.addToCart(user, productId, quantity);
        return ResponseEntity.ok("Item added to cart");
    }
}
