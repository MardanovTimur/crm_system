package ru.crm.taxi.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.service.interfaces.DriverService;

import java.util.List;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    @PostMapping(value = "/add")
    public String registration(@RequestBody DriverDto driverDto) {
        String token = driverService.registration(driverDto);
        return token;
    }

    @PostMapping(value = "/login")
    public String login(@RequestBody AuthDto authDto) {
        String token = driverService.login(authDto);
        return token;
    }

    @PostMapping(value = "/profile/update", produces = "application/json")
    public Driver updateDriver(@RequestHeader("Auth-token") String token,
                               @RequestBody DriverDto driverDto) {
        Driver driver = driverService.updateDriver(token, driverDto);
        return driver;
    }

    @GetMapping(value = "/profile/orders/{orderId}/take", produces = "application/json")
    public Order takeOrder(@RequestHeader("Auth-token") String token,
                           @PathVariable("orderId") long orderId) {
        Order order = driverService.takeOrder(token, orderId);
        return order;
    }

    @PostMapping(value = "/profile/orders/current/decline", produces = "application/json")
    public Driver declineOrder(@RequestHeader("Auth-token") String token,
                               @RequestParam("comment") String comment) {
        Driver driver = driverService.declineOrder(token, comment);
        return driver;
    }

    @GetMapping(value = "/orders/active/all", produces = "application/json")
    public List<Order> getActiveOrders() {
        List<Order> orders = driverService.getActiveOrders();
        return orders;
    }

    @PostMapping(value = "/profile/orders/current/rating/add", produces = "application/json")
    public Driver addRating(@RequestHeader("Auth-token") String token,
                            @RequestParam("rating") int rating) {
        Driver driver = driverService.addRating(token, rating);
        return driver;
    }
}
