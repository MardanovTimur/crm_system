package ru.crm.taxi.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.model.User;
import ru.crm.taxi.service.interfaces.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/add")
    public String registration(@RequestBody UserDto userDto) {
        String token = userService.register(userDto);
        return token;
    }

    @PostMapping(value = "/login")
    public String login(@RequestBody AuthDto authDto) {
        String token = userService.login(authDto);
        return token;
    }

    @PostMapping(value = "/profile/update", produces = "application/json")
    public User updateUserInfo(@RequestHeader("Auth-token") String token,
                               @RequestBody User user) {
        User updatedUser = userService.updateInfo(token, user);
        return updatedUser;
    }

    @PostMapping(value = "/profile/orders/add", produces = "application/json")
    public Order addOrder(@RequestHeader("Auth-token") String token,
                          @RequestBody OrderDto orderDto) {
        Order order = userService.addOrder(token, orderDto);
        return order;
    }

    @GetMapping(value = "/profile/orders/current", produces = "application/json")
    public Order getCurrentOrder(@RequestHeader("Auth-token") String token) {
        Order order = userService.getCurrentOrder(token);
        return order;
    }

    @GetMapping(value = "/profile/orders/{orderId}", produces = "application/json")
    public Order getOrder(@RequestHeader("Auth-token") String token,
                          @PathVariable("orderId") long orderId) {
        Order order = userService.getOrder(token, orderId);
        return order;
    }

    @GetMapping(value = "/profile/orders", produces = "application/json")
    public List<Order> getUserOrders(@RequestHeader("Auth-token") String token,
                                     @RequestParam("from") long from,
                                     @RequestParam("count") long count) {
        List<Order> orders = userService.getUserOrders(token, from, count);
        return orders;
    }

    @PostMapping(value = "/profile/orders/current/delete", produces = "application/json")
    public User deleteCurrentOrder(@RequestHeader("Auth-token") String token) {
        User user = userService.deleteCurrentOrder(token);
        return user;
    }

    @PostMapping(value = "/profile/orders/current/rating/add", produces = "application/json")
    public User addRating(@RequestHeader("Auth-token") String token,
                          @RequestParam("rating") int rating) {
        User user = userService.addOrderDriverRating(token, rating);
        return user;
    }
}
