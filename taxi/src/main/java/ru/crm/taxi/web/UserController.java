package ru.crm.taxi.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.model.User;
import ru.crm.taxi.service.interfaces.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    //TODO: Cделать dto
    @PostMapping(value = "/add")
    public String registration(@RequestBody AuthDto authDto) {
        return null;
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

    @PostMapping(value = "/{id}/orders/{orderId}/delete", produces = "application/json")
    public User deleteOrder(@PathVariable("id") long userId,
                            @PathVariable("orderId") long orderId) {
        return null;
    }
}
