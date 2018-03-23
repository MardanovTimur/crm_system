package ru.crm.taxi.web.controller;

import org.springframework.web.bind.annotation.*;
import ru.crm.taxi.dto.AuthDto;
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

    @GetMapping(value = "/drivers/get", produces = "application/json")
    public List<Driver> getDrivers(@RequestParam("from") long from,
                                   @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/get", produces = "application/json")
    public List<Order> getOrders(@RequestParam("from") long from,
                                 @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/active/get", produces = "application/json")
    public List<Order> getActiveOrders(@RequestParam("from") long from,
                                       @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/accepted/get", produces = "application/json")
    public List<Order> getAcceptedOrders(@RequestParam("from") long from,
                                         @RequestParam("count") long count) {
        return null;
    }

    @GetMapping(value = "/orders/completed/get", produces = "application/json")
    public List<Order> getCompletedOrders(@RequestParam("from") long from,
                                          @RequestParam("count") long count) {
        return null;
    }
}
