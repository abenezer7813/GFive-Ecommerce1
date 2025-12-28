package org.wldu.webservices.services.contrats;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.entities.OrderEntity;

import java.util.List;

public interface OrderService {

    List<OrderEntity> getOrdersForUser(User user);

    OrderEntity checkout(User user);
}

