package com.example.demo.Controller;

import com.example.demo.DTO.AdminDTO;
import com.example.demo.Model.Admin;
import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;
    @Autowired
    DepartmentService departmentService;
    @Autowired
    DesignationService designationService;
    @Autowired
    CredentialsService credentialsService;
    @Autowired
    FacultyService facultyService;

    @GetMapping("/all")
    public List<AdminDTO> getAll(){
        return adminService.getAllAdmin();
    }

    @PostMapping("/add")
    public void addAdmin(@RequestBody AdminDTO admin){
        String email = admin.getEmail();
        Admin admin1 = new Admin();
        admin1.setEmail(email);
        admin1.setDepartment(departmentService.getDepartmentByName(admin.getDepartment()));
        admin1.setRole(admin.getRole());
            Faculty faculty = new Faculty();
            faculty.setEmail(email);
            faculty.setFirstname(email);
            faculty.setDepartment(departmentService.getDepartmentByName(admin.getDepartment()));
            faculty.setDepartmentName(admin.getDepartment());
            faculty.setDesignation(designationService.getDesignationByName(admin.getDesignation()));
            faculty.setDesignationName(admin.getDesignation());
            faculty.setId(admin.getFacultyid());
        int alterIndex = email.indexOf("@");
        String name = email.substring(0, alterIndex);
        Credentials credentials = new Credentials(name , email);
        admin1.setCredentials(credentials);
        credentialsService.saveCredentials(credentials);
        faculty.setCredentials(credentials);
        facultyService.addFaculty(faculty);
        adminService.addAdmin(admin1);
    }

    @GetMapping("/department/{email}")
    public String getDepartment(@PathVariable String email){
        Admin a = adminService.getAdmin(email);
        return a.getDepartment().getName();
    }

    @GetMapping("/get/{email}")
    public Admin getAdminWithEmail(@PathVariable String email){
        return adminService.getAdmin(email);
    }
}
