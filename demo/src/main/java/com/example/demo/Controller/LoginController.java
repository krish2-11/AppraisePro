package com.example.demo.Controller;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.Model.Admin;
import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    CredentialsService credentialsService;

    @Autowired
    FacultyService facultyService;

    @Autowired
    AdminService adminService;
    Credentials credentialsInDatabase;
    Faculty faculty;

    @PostMapping("/faculty")
    public String setCredentialsForValidation(@RequestBody Credentials credentials){
        credentialsInDatabase = credentialsService.findCredentials(credentials.getEmail());
        if(credentialsInDatabase != null){
            if(credentials.getPassword().equals(credentialsInDatabase.getPassword())){
                Faculty faculty = facultyService.getFaculty(credentialsInDatabase);
                if (!faculty.isFirst())
                {
                    return "Authenticated User First";
                }
                else{
                    return "Authenticated User";
                }
            }
            else{
                return "Wrong password!";
            }
        }
        return "Email not registered!";
    }

    @PostMapping("/admin")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Credentials credentials = credentialsService.findCredentials(request.getEmail());
        if (credentials != null && request.getPassword().equals(credentials.getPassword())) {
            Admin a = adminService.getAdmin(credentials.getEmail());
            System.out.println(a.getEmail());
            return ResponseEntity.ok(Map.of("message", a.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
    }


    @PostMapping("/faculty/changepassword")
    public ResponseEntity<String> setNewPassword(@RequestBody Credentials credentials){
        try {
            String response = credentialsService.updatePassword(credentials.getEmail(), credentials.getPassword());
            facultyService.getFaculty(credentials).setFirst(true);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/faculty/getfaculty/{email}")
    public Faculty getFaculty(@PathVariable String email){
        System.out.println(email);
        faculty = facultyService.getFaculty(credentialsService.findCredentials(email));
        System.out.println(faculty);
        return faculty;
    }


}
