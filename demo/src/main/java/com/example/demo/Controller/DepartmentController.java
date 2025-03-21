package com.example.demo.Controller;

import com.example.demo.Model.Department;
import com.example.demo.Service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/department")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @GetMapping("/getAll")
    public List<Department> getAll(){
        return departmentService.getAllDepartment();
    }


    @GetMapping("/addDepartment")
    public void addDepa(@RequestBody Department department){
        departmentService.addDepartment(department);
    }
}
