package org.wldu.webservices.services.imp;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.Cart;
import org.wldu.webservices.entities.CartItem;
import org.wldu.webservices.entities.OrderEntity;
import org.wldu.webservices.entities.OrderItemEntity;
import org.wldu.webservices.repositories.CartRepository;
import org.wldu.webservices.repositories.OrderRepository;
import org.wldu.webservices.services.contrats.OrderService;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;


    public OrderServiceImpl(CartRepository cartRepository, OrderRepository orderRepository) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
    }
    public List<OrderEntity> getOrdersForUser(User user) {
        return orderRepository.findByUserId(user.getId());
    }
    @Transactional
    public OrderEntity checkout(User user) {

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setStatus("PENDING");

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cart.getItems()) {

            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setOrder(order);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPriceAtPurchase(item.getProduct().getPrice());

            order.getItems().add(orderItem);

            total = total.add(
                    item.getProduct().getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()))
            );
        }

        order.setTotalPrice(total);

        cart.getItems().clear(); // empty cart

        return orderRepository.save(order);
    }
}
