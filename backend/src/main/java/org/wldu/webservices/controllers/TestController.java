package org.wldu.webservices.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @PostMapping("/hello")
    public String hello(@RequestBody String body) {
        return "Received: " + body;
    }
}
