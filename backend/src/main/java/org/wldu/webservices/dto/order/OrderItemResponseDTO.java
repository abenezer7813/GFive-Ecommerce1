package org.wldu.webservices.dto.order;

import lombok.*;

import java.math.BigDecimal;


public class OrderItemResponseDTO {
    private Long productId;
    private String productName;
    private BigDecimal price;
    private int quantity;

    public OrderItemResponseDTO(Long productId, String productName, BigDecimal price, int quantity) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public String getProductName() {
        return productName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }
}

