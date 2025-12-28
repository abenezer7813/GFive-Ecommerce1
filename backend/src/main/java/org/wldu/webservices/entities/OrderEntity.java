package org.wldu.webservices.entities;

import jakarta.persistence.*;
import org.wldu.webservices.auths.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItemEntity> items = new HashSet<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;

    // ===== CONSTRUCTORS =====

    public OrderEntity() {
        // Default constructor for JPA
    }

    public OrderEntity(User user, String status, BigDecimal totalPrice) {
        this.user = user;
        this.status = status;
        this.totalPrice = totalPrice;
        this.items = new HashSet<>();
    }

    public OrderEntity(Long id, User user, String status, BigDecimal totalPrice,
                       Set<OrderItemEntity> items, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.status = status;
        this.totalPrice = totalPrice;
        this.items = items;
        this.createdAt = createdAt;
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public Set<OrderItemEntity> getItems() { return items; }
    public void setItems(Set<OrderItemEntity> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // ===== LIFECYCLE CALLBACK =====
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
