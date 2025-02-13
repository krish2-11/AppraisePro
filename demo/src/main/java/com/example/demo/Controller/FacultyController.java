package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    Faculty facultyDetail;

    @GetMapping("/getAll")
    public List<Faculty> getAll(){
        return facultyService.getAllFaculty();
    }

    @PostMapping("/add")
    public void addFaculty(@RequestBody Faculty faculty){
        String email = faculty.getEmail();
        faculty.setFirstname(email);
        int alterIndex = email.indexOf("@");
        String name = email.substring(0, alterIndex);;
        Credentials credentials = new Credentials(name , email);
        faculty.setCredentials(credentials);
        credentialsService.saveCredentials(credentials);
        facultyService.addFaculty(faculty);
    }

    @PostMapping("/saveDetails")
    public void saveFacultyDetails(@RequestBody Faculty faculty){
        facultyDetail = faculty;
        facultyService.updateFaculty(faculty);
    }

    @PostMapping("/savePhoto")
    public void updatePhoto(@RequestParam("photo")MultipartFile photo) throws IOException {
        facultyDetail.setPhoto(photo.getBytes());
        facultyService.updateFaculty(facultyDetail);
    }

}
