package org.wldu.webservices.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDTO {
    private Long cartId;
    private Long userId;
    private List<CartResponseDTO> items; // CartItemDTO has id, productId, quantity
}
