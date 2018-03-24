package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.User;

import java.util.List;

public interface UserDao {

    void saveUser(User user);

    boolean userExistenceById(long id);

    boolean userExistenceByPhone(String phone);

    boolean userExistenceByToken(String token);

    User updateUser(User user);

    void deleteUser(long id);

    User getUserById(long id);

    User getUserByPhone(String phone);

    User getUserByToken(String token);

    List<User> getAllUsers();
}
