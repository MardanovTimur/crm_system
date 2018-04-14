package ru.crm.taxi.service.interfaces;

import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;

import java.util.List;

public interface AdminService {

    List<Order> getOrders();


}
