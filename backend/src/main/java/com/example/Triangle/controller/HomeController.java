package com.example.Triangle.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String home() {
        return "Hello world";
    }

    @RequestMapping("/user")
    public Principal user(Principal user){
        return user;
    }
}
