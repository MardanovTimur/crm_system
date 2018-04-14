package ru.crm.taxi.web.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.crm.taxi.service.interfaces.AdminService;

@Controller
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    AdminService adminService;

    @RequestMapping("/")
    public String orders(Map<String, Object> model) {
        System.out.println(adminService.getOrders());
        model.put("orders", "ord");
        return "orders";
    }

}