package ru.crm.taxi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.crm.taxi.dao.interfaces.OrderDao;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.service.interfaces.AdminService;

import java.util.List;


@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    OrderDao orderDao;

    @Override
    public List<Order> getOrders() {
        return orderDao.getAllOrders();
    }
}
