package org.wldu.webservices.controllers;

import org.wldu.webservices.dto.order.OrderResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.enities.OrderEntity;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.services.imp.OrderServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/orders")

public class OrderController {


    private final OrderServiceImpl orderService;

    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponseDTO> checkout(
            @AuthenticationPrincipal User user) {

        OrderEntity order = orderService.checkout(user);

        OrderResponseDTO dto = new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getTotalPrice()
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public List<OrderResponseDTO> myOrders(
            @AuthenticationPrincipal User user) {

        return orderService.getOrdersForUser(user)
                .stream()
                .map(o -> new OrderResponseDTO(
                        o.getId(),
                        o.getStatus(),
                        o.getTotalPrice()
                ))
                .toList();
    }
}
