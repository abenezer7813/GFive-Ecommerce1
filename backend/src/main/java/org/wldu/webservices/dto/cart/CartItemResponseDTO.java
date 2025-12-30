package org.wldu.webservices.dto.cart;

import lombok.*;

import java.math.BigDecimal;


public class CartItemResponseDTO {

    private Long productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private String imageUrl;

    public CartItemResponseDTO(Long productId, String productName, BigDecimal price, int quantity, String imageUrl) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }

    public Long getProductId() {
        return productId;
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
    public String getImageUrl() {
        return imageUrl;
    }
}
