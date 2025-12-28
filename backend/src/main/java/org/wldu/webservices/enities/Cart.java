package org.wldu.webservices.enities;

import jakarta.persistence.*;
import org.wldu.webservices.auths.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> items = new HashSet<>();

    // ===== CONSTRUCTORS =====

    public Cart() {
        // default constructor for JPA
    }

    public Cart(User user) {
        this.user = user;
        this.items = new HashSet<>();
    }

    public Cart(Long id, User user, Set<CartItem> items) {
        this.id = id;
        this.user = user;
        this.items = items;
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Set<CartItem> getItems() { return items; }
    public void setItems(Set<CartItem> items) { this.items = items; }

    // ===== HELPER METHODS =====

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
    }
}
