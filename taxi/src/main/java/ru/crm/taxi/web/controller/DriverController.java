package ru.crm.taxi.web.controller;

import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;

import java.util.List;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @PostMapping(value = "/add")
    public String registration(@RequestBody DriverDto driverDto) {
        return null;
    }

    @PostMapping(value = "/login")
    public String login(@RequestBody AuthDto authDto) {
        return null;
    }

    @PostMapping(value = "/{id}/update", produces = "application/json")
    public Driver updateDriver(@PathVariable("id") long id,
                               @RequestBody DriverDto driverDto) {
        return null;
    }

    @GetMapping(value = "/{id}/orders/{orderId}/take", produces = "application/json")
    public Order takeOrder(@PathVariable("id") long id,
                           @PathVariable("orderId") long orderId) {
        return null;
    }

    @PostMapping(value = "/{id}/orders/current/decline", produces = "application/json")
    public Driver declineOrder(@PathVariable("id") long id,
                               @RequestParam("comment") String comment) {
        return null;
    }

    @GetMapping(value = "/orders/active/all", produces = "application/json")
    public List<Order> getActiveOrders() {
        return null;
    }

    @PostMapping(value = "/{id}/orders/current/rating/add", produces = "application/json")
    public Driver addRating(@PathVariable("id") long id,
                            @RequestParam("rating") int rating) {
        return null;
    }
}
