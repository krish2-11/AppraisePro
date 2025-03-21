package com.example.demo.Service;

import com.example.demo.Model.Department;
import com.example.demo.Repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentRepo departmentRepo;

    public List<Department> getAllDepartment(){
        return departmentRepo.findAll();
    }
    public void addDepartment(Department department){
        departmentRepo.save(department);
    }
    public Department getDepartmentByName(String name){
        return departmentRepo.findByName(name);
    }
}
