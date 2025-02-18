package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    CredentialsService credentialsService;

    @Autowired
    FacultyService facultyService;

    Credentials credentialsInDatabase;
    Credentials credentialEntered;
    Faculty faculty;

    @PostMapping("/faculty")
    public void setCredentialsForValidation(@RequestBody Credentials credentials){
        credentialEntered = credentials;
        credentialsInDatabase = credentialsService.findCredentials(credentials.getEmail());
    }

    @GetMapping("/faculty/valid")
    public String validate(){
        if(credentialsInDatabase != null){
            if(credentialEntered.getPassword().equals(credentialsInDatabase.getPassword())){
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

    @PostMapping("/faculty/detail")
    public void setFaculty(@RequestBody Credentials credentials){
        credentialsInDatabase = credentialsService.findCredentials(credentials.getEmail());
        faculty = facultyService.getFaculty(credentialsInDatabase);
    }

    @GetMapping("/faculty/getfaculty")
    public Faculty getFaculty(){
        return faculty;
    }


}
