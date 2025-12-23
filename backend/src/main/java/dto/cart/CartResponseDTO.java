package dto.cart;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter @AllArgsConstructor
public class CartResponseDTO {

    private Long cartId;
    private List<CartItemResponseDTO> items;
    private BigDecimal totalPrice;
}

