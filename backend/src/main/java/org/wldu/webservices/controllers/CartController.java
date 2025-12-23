package org.wldu.webservices.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.services.imp.CartServiceImpl;

@RestController
@RequestMapping("/api/cart")

public class CartController {

    private final CartServiceImpl cartService;

    public CartController(CartServiceImpl cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @AuthenticationPrincipal User user) {

        cartService.addToCart(user, productId, quantity);
        return ResponseEntity.ok("Added to cart");
    }
}

