package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.Order;

import java.util.List;

public interface OrderDao {

    void saveOrder(Order order);

    boolean orderExistenceById(long id);

    Order updateOrder(Order order);

    void deleteOrder(long id);

    Order getOrderById(long id);

    List<Order> getAllOrders();
}
