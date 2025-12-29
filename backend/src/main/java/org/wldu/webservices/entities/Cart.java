package org.wldu.webservices.entities;

import jakarta.persistence.*;
import org.wldu.webservices.auths.User;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    // ===== Getters & Setters =====
    public Long getId() { return id; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public List<CartItem> getItems() { return items; }

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
    }
}
