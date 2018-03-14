package ru.crm.taxi.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.crm.taxi.service.interfaces.UserService;

@Controller
@ComponentScan(basePackages = "ru.crm.taxi")
@EnableAutoConfiguration
public class Application {

    @Autowired
    UserService userService;

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

    @RequestMapping("/hw")
    @ResponseBody
    public String hw() {
        return "hW";
    }
}