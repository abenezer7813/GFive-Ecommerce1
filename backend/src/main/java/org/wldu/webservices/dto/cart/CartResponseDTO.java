package org.wldu.webservices.dto.cart;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;


public class CartResponseDTO {

    private Long cartId;
    private List<CartItemResponseDTO> items;
    private BigDecimal totalPrice;

    public CartResponseDTO(Long cartId, List<CartItemResponseDTO> items, BigDecimal totalPrice) {
        this.cartId = cartId;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public Long getCartId() {
        return cartId;
    }

    public List<CartItemResponseDTO> getItems() {
        return items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
}

