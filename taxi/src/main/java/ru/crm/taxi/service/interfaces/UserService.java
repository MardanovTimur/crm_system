package ru.crm.taxi.service.interfaces;

import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.model.User;

import java.util.List;

public interface UserService {

    String register(UserDto userDto);

    String login(AuthDto authDto);

    User updateInfo(String token, User user);

    Order addOrder(String token, OrderDto orderDto);

    Order getCurrentOrder(String token);

    Order getOrder(String token, long orderId);

    List<Order> getUserOrders(String token, long from, long count);

    User deleteCurrentOrder(String token);

    User addOrderDriverRating(String token, int rating);
}
