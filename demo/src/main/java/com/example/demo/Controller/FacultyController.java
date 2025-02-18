package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.EmailService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
@CrossOrigin
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private EmailService emailService; // Inject EmailService

    Faculty facultyDetail;

    @GetMapping("/getAll")
    public List<Faculty> getAll(){
        return facultyService.getAllFaculty();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addFaculty(@RequestBody Faculty faculty){
        try {
            String email = faculty.getEmail();
            faculty.setFirstname(email);
            int alterIndex = email.indexOf("@");
            String name = email.substring(0, alterIndex);
            Credentials credentials = new Credentials(name, email);
            faculty.setCredentials(credentials);
            credentialsService.saveCredentials(credentials);
            facultyService.addFaculty(faculty);

            // 🎯 Send Welcome Email
            String subject = "Welcome to Our Platform!";
            String loginUrl = "http://localhost:3000/faculty/login"; // Update if needed
            emailService.sendEmail(email, subject, name, loginUrl);

            return ResponseEntity.ok("Faculty added and email sent!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
