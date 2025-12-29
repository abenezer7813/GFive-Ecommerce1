package org.wldu.webservices.dto.cart;

import lombok.Data;

@Data
public class CartRequestDTO {
    private Long productId;
    private int quantity;
    private Long cartItemId; // for update/remove operations
}
