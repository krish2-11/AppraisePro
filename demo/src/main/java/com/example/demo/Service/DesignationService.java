package com.example.demo.Service;

import com.example.demo.Model.Designation;
import com.example.demo.Repository.DesignationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignationService {
    @Autowired
    DesignationRepo designationRepo;

    public List<Designation> getAllDesignation(){
        return designationRepo.findAll();
    }
    public void addDesignation(Designation designation){
        designationRepo.save(designation);
    }

    public Designation getDesignationByName(String name){
        return designationRepo.findByName(name);
    }
}
