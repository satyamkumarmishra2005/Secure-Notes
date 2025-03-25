package com.secure.NOTES;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HelloWorldController {
    @GetMapping("/hello")
    public String sayHello(){
        return "Hello";
    }

    @GetMapping("/contact")
    public String sayContact(){
        return "contact";
    }

    @GetMapping("/hi")
    public String sayhi(){
        return "hi";
    }


}
