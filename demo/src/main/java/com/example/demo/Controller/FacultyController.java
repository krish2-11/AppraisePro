package com.example.demo.Controller;

import com.example.demo.DTO.AddFacultyFormDetails;
import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/faculty")
@CrossOrigin
public class FacultyController {

    @Autowired
    FacultyService facultyService;
    @Autowired
    CredentialsService credentialsService;
    @Autowired
    DepartmentService departmentService;
    @Autowired
    DesignationService designationService;

    @Autowired
    private EmailService emailService; // Inject EmailService

    Faculty facultyDetail;

    @GetMapping("/getAll")
    public List<Faculty> getAll(){
        return facultyService.getAllFaculty();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addFaculty(@RequestBody AddFacultyFormDetails addFacultyFormDetails){
        try {
            String email = addFacultyFormDetails.getEmail();

            Faculty faculty = new Faculty();
            faculty.setEmail(email);
            faculty.setFirstname(email);
            faculty.setDepartment(departmentService.getDepartmentByName(addFacultyFormDetails.getDepartment()));
            faculty.setDepartmentName(addFacultyFormDetails.getDepartment());
            faculty.setDesignation(designationService.getDesignationByName(addFacultyFormDetails.getDesignation()));
            faculty.setDesignationName(addFacultyFormDetails.getDesignation());
            faculty.setId(addFacultyFormDetails.getFacultyid());
            int alterIndex = email.indexOf("@");
            String name = email.substring(0, alterIndex);
            Credentials credentials = new Credentials(name , email);
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

    @PatchMapping("/saveDetails")
    public void saveFacultyDetails(@RequestBody Faculty faculty){
        facultyDetail = facultyService.updateFaculty(faculty);
    }

    @PostMapping("/savePhoto")
    public void updatePhoto(@RequestParam("photo") MultipartFile photo) throws IOException {
        facultyDetail.setPhoto(photo.getBytes());
        facultyService.updateFaculty(facultyDetail);
    }


}
