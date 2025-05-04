package com.example.demo.Controller;

import com.example.demo.DTO.AddFacultyFormDetails;
import com.example.demo.Model.Admin;
import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.*;
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
    @Autowired
    DepartmentService departmentService;
    @Autowired
    DesignationService designationService;
    @Autowired
    AdminService adminService;
    Faculty facultyDetail;

    @GetMapping("/getAll/{email}")
    public List<Faculty> getAll(@PathVariable String email){
        Admin a = adminService.getAdmin(email);
        String department = a.getDepartment().getName();
        return facultyService.getAllFaculty(department);
    }

    @PostMapping("/add")
    public void addFaculty(@RequestBody AddFacultyFormDetails addFacultyFormDetails){
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
    }

    @PatchMapping("/saveDetails")
    public void saveFacultyDetails(@RequestBody Faculty faculty){
        facultyDetail = facultyService.updateFaculty(faculty);
    }

    @PostMapping("/savePhoto")
    public void updatePhoto(@RequestParam("photo")MultipartFile photo) throws IOException {
        facultyDetail.setPhoto(photo.getBytes());
        facultyService.updateFaculty(facultyDetail);
    }

}
