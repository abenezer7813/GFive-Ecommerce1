package org.wldu.webservices.dto.cart;

import lombok.*;

import java.math.BigDecimal;

@Getter @AllArgsConstructor
public class CartItemResponseDTO {

    private Long productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
}
