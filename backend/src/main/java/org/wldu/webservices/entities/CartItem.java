package org.wldu.webservices.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // ===== Getters & Setters =====
    public Long getId() { return id; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Cart getCart() { return cart; }

    public void setCart(Cart cart) { this.cart = cart; }

    public Product getProduct() { return product; }

    public void setProduct(Product product) { this.product = product; }
}
