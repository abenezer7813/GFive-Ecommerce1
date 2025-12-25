package org.wldu.webservices.dto.order;

import lombok.*;

import java.math.BigDecimal;


public class OrderItemResponseDTO {

    private String productName;
    private BigDecimal price;
    private int quantity;

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

