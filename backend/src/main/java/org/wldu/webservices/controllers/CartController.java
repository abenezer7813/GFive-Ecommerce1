package org.wldu.webservices.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.auths.UserRepository;
import org.wldu.webservices.dto.cart.CartItemResponseDTO;
import org.wldu.webservices.dto.cart.CartResponseDTO;
import org.wldu.webservices.dto.order.OrderResponseDTO;
import org.wldu.webservices.entities.Cart;
import org.wldu.webservices.entities.OrderEntity;
import org.wldu.webservices.services.imp.CartServiceImpl;
import org.wldu.webservices.services.imp.OrderServiceImpl;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")

public class CartController {

    private final CartServiceImpl cartService;
    private final UserRepository userRepository;
    private final OrderServiceImpl orderService;

    public CartController(CartServiceImpl cartService, UserRepository userRepository, OrderServiceImpl orderService) {
        this.cartService = cartService;
        this.userRepository = userRepository;
        this.orderService = orderService;
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

    Cart cart=    cartService.addToCart(user, productId, quantity);

        List<CartItemResponseDTO> items=cart.getItems().stream()
                .map(item->new CartItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getProduct().getImageUrl()
                )).toList();

        BigDecimal totalPrice =items.stream()
                .map(i->i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                cart.getId(),
                items,
                totalPrice
        );
        return ResponseEntity.ok(cartResponseDTO);
    }
    @PutMapping("/update")
    public ResponseEntity<CartResponseDTO> updateCartItem(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1. Use delete endpoint to remove item.");
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.updateCartItem(user, productId, quantity);

        List<CartItemResponseDTO> items=cart.getItems().stream()
                .map(item->new CartItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getProduct().getImageUrl()
                )).toList();

        BigDecimal totalPrice =items.stream()
                .map(i->i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                cart.getId(),
                items,
                totalPrice
        );
        return ResponseEntity.ok(cartResponseDTO);
    }
    @DeleteMapping("/remove")
    public ResponseEntity<CartResponseDTO> removeCartItem(
            @RequestParam Long productId,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.removeCartItem(user, productId);

        List<CartItemResponseDTO> items=cart.getItems().stream()
                .map(item->new CartItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getProduct().getImageUrl()
                )).toList();

        BigDecimal totalPrice =items.stream()
                .map(i->i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                cart.getId(),
                items,
                totalPrice
        );
        return ResponseEntity.ok(cartResponseDTO);
    }
    @GetMapping
    public ResponseEntity<CartResponseDTO> getMyCart(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getCartForUser(user);

        List<CartItemResponseDTO> items = cart.getItems().stream()
                .map(item -> new CartItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getProduct().getImageUrl()

                ))
                .toList();

        BigDecimal totalPrice = items.stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartResponseDTO response = new CartResponseDTO(
                cart.getId(),
                items,
                totalPrice
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponseDTO> checkout(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrderEntity order = orderService.checkout(user);

        OrderResponseDTO dto = new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getTotalPrice(),
                order.getCreatedAt().toString()
        );

        return ResponseEntity.ok(dto);
    }



}

