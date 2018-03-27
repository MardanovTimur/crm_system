package ru.crm.taxi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.crm.taxi.dao.interfaces.DriverDao;
import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.service.interfaces.DriverService;
import ru.crm.taxi.service.utils.generators.HashGenerator;
import ru.crm.taxi.service.utils.generators.TokenGenerator;
import ru.crm.taxi.verification.Verification;

import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverDao driverDao;
    @Autowired
    HashGenerator hashGenerator;
    @Autowired
    TokenGenerator tokenGenerator;
    @Autowired
    Verification verification;

    @Override
    public String registration(DriverDto driverDto) {
        return null;
    }

    @Override
    public String login(AuthDto authDto) {
        return null;
    }

    @Override
    public Driver updateDriver(String token, DriverDto driverDto) {
        return null;
    }

    @Override
    public Order takeOrder(String token, long orderId) {
        return null;
    }

    @Override
    public Driver declineOrder(String token, String comment) {
        return null;
    }

    @Override
    public List<Order> getActiveOrders() {
        return null;
    }

    @Override
    public Driver addRating(String token, int rating) {
        return null;
    }
}
