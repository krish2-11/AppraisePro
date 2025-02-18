package com.example.demo.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {
    @RequestMapping("/login/{email}")
    public String login(@PathVariable String email){
        return "Authenticated";
    }
}
