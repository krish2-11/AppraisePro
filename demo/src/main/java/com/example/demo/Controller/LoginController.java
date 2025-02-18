package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.EmailService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private EmailService emailService; // Inject EmailService

    private Credentials credentialsInDatabase;
    private Credentials credentialEntered;
    private Faculty faculty;

    @PostMapping("/faculty")
    public void setCredentialsForValidation(@RequestBody Credentials credentials) {
        credentialEntered = credentials;
        credentialsInDatabase = credentialsService.findCredentials(credentials.getEmail());
    }

    @GetMapping("/faculty/valid")
    public String validate() {
        if (credentialsInDatabase != null) {
            if (credentialEntered.getPassword().equals(credentialsInDatabase.getPassword())) {
                Faculty faculty = facultyService.getFaculty(credentialsInDatabase);

                if (!faculty.isFirst()) {
                    // Set first login flag to true
                    faculty.setFirst(true);
                    facultyService.updateFaculty(faculty);

                    // Send Email Notification on First Login
                    String email = credentialsInDatabase.getEmail();
                    String subject = "Welcome to Our Platform!";
                    String name = faculty.getFirstname();
                    String resetPasswordUrl = "http://localhost:3000/faculty/first/changePassword"; // Adjust based on frontend

                    emailService.sendEmail(email, subject, name, resetPasswordUrl);

                    return "Authenticated User First";
                } else {
                    return "Authenticated User";
                }
            } else {
                return "Wrong password!";
            }
        }
        return "Email not registered!";
    }
}
