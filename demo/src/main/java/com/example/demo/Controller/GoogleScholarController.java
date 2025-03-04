package com.example.demo.Controller;

import com.example.demo.Service.GoogleScholarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/scholar")
@CrossOrigin(origins = "*")
public class GoogleScholarController {

    @Autowired
    private GoogleScholarService googleScholarService;

    // API to fetch profile based on user-provided URL
    @PostMapping("/getProfile")
    public Map<String, String> getScholarProfile(@RequestBody Map<String, String> requestBody) {
        String profileUrl = requestBody.get("profileUrl");  // User provides full Google Scholar URL
        return googleScholarService.fetchScholarProfile(profileUrl);
    }
}
