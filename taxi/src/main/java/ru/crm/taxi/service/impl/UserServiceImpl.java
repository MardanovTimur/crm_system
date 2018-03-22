package ru.crm.taxi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.model.User;
import ru.crm.taxi.service.interfaces.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public String register(User user) {
        userDao.saveUser(user);
        return "TOKEN";
    }
}
