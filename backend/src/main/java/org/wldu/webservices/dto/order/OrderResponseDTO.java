package org.wldu.webservices.dto.order;

import java.math.BigDecimal;
import java.util.List;

public class OrderResponseDTO {

    private Long id;
    private String status;
    private BigDecimal totalPrice;
    private List<OrderItemResponseDTO> items;

    public OrderResponseDTO(Long id, String status, BigDecimal totalPrice, List<OrderItemResponseDTO> items) {
        this.id = id;
        this.status = status;
        this.totalPrice = totalPrice;
        this.items = items;
    }public OrderResponseDTO(Long id, String status, BigDecimal totalPrice) {
        this.id = id;
        this.status = status;
        this.totalPrice = totalPrice;

    }

    // getters
    public Long getId() { return id; }
    public String getStatus() { return status; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public List<OrderItemResponseDTO> getItems() { return items; }
}
