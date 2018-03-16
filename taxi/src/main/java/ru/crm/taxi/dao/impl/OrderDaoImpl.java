package ru.crm.taxi.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import ru.crm.taxi.dao.config.HibernateConnectionFactory;
import ru.crm.taxi.dao.interfaces.OrderDao;
import ru.crm.taxi.model.Order;

import java.util.List;

public class OrderDaoImpl implements OrderDao {

    @Override
    public void saveOrder(Order order) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(order);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateOrder(Order order) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(order);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateOrder(Order order, long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(order);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteOrder(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Order.class)
                .add(Restrictions.eq("or_id", id));
        Order order = (Order) criteria.uniqueResult();
        session.delete(order);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public Order getOrderById(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Order.class)
                .add(Restrictions.eq("or_id", id));
        Order order = (Order) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        List<Order> orders = session.createCriteria(Order.class).list();
        session.getTransaction().commit();
        session.close();
        return orders;
    }
}
