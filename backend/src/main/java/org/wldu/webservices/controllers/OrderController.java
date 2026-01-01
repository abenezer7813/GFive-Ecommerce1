package org.wldu.webservices.controllers;

import org.hibernate.query.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                order.getTotalPrice(),
                order.getCreatedAt().toString()
        );

        return ResponseEntity.ok(dto);
    }

    //    @GetMapping()
//    public List<OrderResponseDTO> myOrders(
//            @AuthenticationPrincipal UserDetails userDetails) {
//
//        User user = userRepository.findByEmail(userDetails.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return orderService.getOrdersForUser(user)
//                .stream()
//                .map(o -> new OrderResponseDTO(
//                        o.getId(),
//                        o.getStatus(),
//                        o.getTotalPrice()
//                ))
//                .toList();
//    }
    private OrderResponseDTO mapToDto(OrderEntity order) {

        List<OrderItemResponseDTO> items = order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getPriceAtPurchase(),
                        item.getQuantity()
                ))
                .toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getTotalPrice(),
                items,
                order.getCreatedAt().toString()
        );
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        List<OrderEntity> orders = orderRepository.findByUserId(userId);

        List<OrderResponseDTO> response = orders.stream()
                .map(this::mapToDto)
                .toList();

        return ResponseEntity.ok(response);
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
                items,
                order.getCreatedAt().toString()

        );

        return ResponseEntity.ok(dto);
    }
    @GetMapping("/total-orders")
    public ResponseEntity<Map<String, Integer>> getTotalOrders() {
        long totalOrders = orderRepository.count();
        Map<String, Integer> response = new HashMap<>();
        response.put("totalOrders", (int) totalOrders);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/latest")
    public ResponseEntity<List<OrderResponseDTO>> getLatestOrders() {
        Pageable limit = PageRequest.of(0, 10); // First page, 10 orders
        List<OrderEntity> latestOrders = orderRepository.findAllByOrderByCreatedAtDesc(limit);

        List<OrderResponseDTO> response = latestOrders.stream()
                .map(this::mapToDto)  // reuse your existing private mapper
                .toList();

        return ResponseEntity.ok(response);
    }


}