package ru.crm.taxi.dao.impl;

import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void saveUser(User user) {
        em.persist(user);
    }

    @Override
    public boolean userExistenceById(long id) {
        List<User> user = em.createQuery("from User u where u.id = :id")
                .setParameter("id", id)
                .getResultList();
        return user.size() > 0;
    }

    @Override
    public boolean userExistenceByPhone(String phone) {
        List<User> user = em.createQuery("from User u where u.phoneNumber = :phone")
                .setParameter("phone", phone)
                .getResultList();
        return user.size() > 0;
    }

    @Override
    public boolean userExistenceByToken(String token) {
        List<User> user = em.createQuery("from User u where u.authToken = :token")
                .setParameter("token", token)
                .getResultList();
        return user.size() > 0;
    }

    @Override
    public User updateUser(User user) {
        User userFromDB = em.merge(user);
        return userFromDB;
    }

    @Override
    public void deleteUser(long id) {
        em.createQuery("delete from User u where u.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    public User getUserById(long id) {
        User user = em.find(User.class, id);
        return user;
    }

    @Override
    public User getUserByPhone(String phone) {
        User user = (User) em.createQuery("from User u where u.phoneNumber = :phone")
                .setParameter("phone", phone)
                .getSingleResult();
        return user;
    }

    @Override
    public User getUserByToken(String token) {
        User user = (User) em.createQuery("from User u where u.authToken = :token")
                .setParameter("token", token)
                .getSingleResult();
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = em.createQuery("from User")
                .getResultList();
        return users;
    }
}
