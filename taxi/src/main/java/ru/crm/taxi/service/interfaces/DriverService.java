package ru.crm.taxi.service.interfaces;

import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;

import java.util.List;

public interface DriverService {

    String registration(DriverDto driverDto);

    String login(AuthDto authDto);

    Driver updateDriver(String token, DriverDto driverDto);

    Order takeOrder(String token, long orderId);

    Driver declineOrder(String token, String comment);

    List<Order> getActiveOrders();

    Driver addRating(String token, int rating);
}
