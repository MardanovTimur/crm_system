package ru.crm.taxi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.model.User;
import ru.crm.taxi.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public String register(User user) {
        return null;
    }
}
