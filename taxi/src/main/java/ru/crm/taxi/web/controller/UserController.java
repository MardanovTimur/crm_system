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
        return null;
    }

    @PostMapping(value = "/{id}/update", produces = "application/json")
    public User updateUserInfo(@PathVariable("id") long id,
                               @RequestBody User user) {
        return null;
    }

    @PostMapping(value = "/{id}/orders/add", produces = "application/json")
    public Order addOrder(@PathVariable("id") long id,
                          @RequestBody OrderDto orderDto) {
        return null;
    }

    @GetMapping(value = "/{id}/orders/current", produces = "application/json")
    public Order getCurrentOrder(@PathVariable("id") long id) {
        return null;
    }

    @GetMapping(value = "/{id}/orders/{orderId}", produces = "application/json")
    public Order getOrder(@PathVariable("id") long userId,
                          @PathVariable("orderId") long orderId) {
        return null;
    }

    @GetMapping(value = "/{id}/orders", produces = "application/json")
    public List<Order> getUserOrders(@PathVariable("id") long id,
                                     @RequestParam("from") long from,
                                     @RequestParam("count") long count) {
        return null;
    }

    @PostMapping(value = "/{id}/orders/current/delete", produces = "application/json")
    public User deleteCurrentOrder(@PathVariable("id") long id) {
        return null;
    }

    @PostMapping(value = "/{id}/orders/current/rating/add", produces = "application/json")
    public User addRating(@PathVariable("id") long id,
                          @RequestParam("rating") int rating) {
        return null;
    }
}
