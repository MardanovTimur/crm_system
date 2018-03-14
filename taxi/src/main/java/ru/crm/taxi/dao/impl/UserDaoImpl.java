package ru.crm.taxi.dao.impl;

import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.model.User;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Override
    public void saveUser(User user) {

    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public void updateUser(User user, long id) {

    }

    @Override
    public void deleteUser(long id) {

    }

    @Override
    public User getUserById(long id) {
        return null;
    }

    @Override
    public User getUserByPhone(String phone) {
        return null;
    }

    @Override
    public User getUserByToken(String token) {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return null;
    }
}
