package com.example.Triangle.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Hello");
    }


    @GetMapping("/owner")
    public ResponseEntity<String> owner() {
        return ResponseEntity.ok("owner");
    }
}
