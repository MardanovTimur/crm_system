package ru.crm.taxi.web.controller;

import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @PostMapping(value = "/login")
    public String login(@RequestBody AuthDto authDto) {
        return null;
    }

    @GetMapping(value = "/drives/get")
    public List<Driver> getDrivers(@RequestParam("from") long from,
                                   @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/get")
    public List<Order> getOrders(@RequestParam("from") long from,
                                 @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/active/get")
    public List<Order> getActiveOrders(@RequestParam("from") long from,
                                       @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/completed/get")
    public List<Order> getCompletedOrders(@RequestParam("from") long from,
                                          @RequestParam("count") long count) {
        return null;
    }
}
