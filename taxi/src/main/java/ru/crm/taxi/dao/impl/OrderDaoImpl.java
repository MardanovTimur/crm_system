package ru.crm.taxi.dao.impl;

import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.interfaces.OrderDao;
import ru.crm.taxi.model.Order;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void saveOrder(Order order) {
        em.persist(order);
    }

    @Override
    public boolean orderExistenceById(long id) {
        List<Order> order = em.createQuery("from Order o where o.id = :id")
                .setParameter("id", id)
                .getResultList();
        return order.size() > 0;
    }

    @Override
    public Order updateOrder(Order order) {
        Order orderFromDB = em.merge(order);
        return orderFromDB;
    }

    @Override
    public void deleteOrder(long id) {
        em.createQuery("delete from Order o where o.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    public Order getOrderById(long id) {
        Order order = em.find(Order.class, id);
        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        List<Order> orders = em.createQuery("from Order")
                .getResultList();
        return orders;
    }
}
