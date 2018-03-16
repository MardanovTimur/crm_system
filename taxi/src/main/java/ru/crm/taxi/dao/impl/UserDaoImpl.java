package ru.crm.taxi.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.config.HibernateConnectionFactory;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.model.User;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Override
    public void saveUser(User user) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(user);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateUser(User user) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(user);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateUser(User user, long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(user);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteUser(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class)
                .add(Restrictions.eq("us_id", id));
        User user = (User) criteria.uniqueResult();
        session.delete(user);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public User getUserById(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class)
                .add(Restrictions.eq("us_id", id));
        User user = (User) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return user;
    }

    @Override
    public User getUserByPhone(String phone) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class)
                .add(Restrictions.eq("phone_number", phone));
        User user = (User) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return user;
    }

    @Override
    public User getUserByToken(String token) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class)
                .add(Restrictions.eq("auth_token", token));
        User user = (User) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        List<User> users = session.createCriteria(User.class).list();
        session.getTransaction().commit();
        session.close();
        return users;
    }
}
