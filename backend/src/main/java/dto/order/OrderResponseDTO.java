package dto.order;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;





import java.math.BigDecimal;

public class OrderResponseDTO {

    private Long id;
    private String status;
    private BigDecimal totalPrice;

    // No-args constructor
    public OrderResponseDTO() {}

    // All-args constructor (needed!)
    public OrderResponseDTO(Long id, String status, BigDecimal totalPrice) {
        this.id = id;
        this.status = status;
        this.totalPrice = totalPrice;
    }

    // Getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}
