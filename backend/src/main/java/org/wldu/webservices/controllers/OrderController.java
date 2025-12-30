package org.wldu.webservices.controllers;

import org.springframework.security.core.userdetails.UserDetails;
import org.wldu.webservices.auths.UserRepository;
import org.wldu.webservices.dto.order.OrderItemResponseDTO;
import org.wldu.webservices.dto.order.OrderResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.entities.OrderEntity;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.exception.ResourceNotFoundException;
import org.wldu.webservices.repositories.OrderRepository;
import org.wldu.webservices.services.imp.OrderServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/orders")

public class OrderController {


    private final OrderServiceImpl orderService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public OrderController(OrderServiceImpl orderService, UserRepository userRepository, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponseDTO> checkout(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        OrderEntity order = orderService.checkout(user);

        OrderResponseDTO dto = new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getTotalPrice()
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping()
    public List<OrderResponseDTO> myOrders(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderService.getOrdersForUser(user)
                .stream()
                .map(o -> new OrderResponseDTO(
                        o.getId(),
                        o.getStatus(),
                        o.getTotalPrice()
                ))
                .toList();
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> getOrderDetails(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }

        List<OrderItemResponseDTO> items = order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getPriceAtPurchase(),
                        item.getQuantity()             ))
                .toList();

        OrderResponseDTO dto = new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getTotalPrice(),
                items

        );

        return ResponseEntity.ok(dto);
    }

}
