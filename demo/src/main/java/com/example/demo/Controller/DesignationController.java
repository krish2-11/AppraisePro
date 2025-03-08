package com.example.demo.Controller;

import com.example.demo.Model.Designation;
import com.example.demo.Service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/designation")
@CrossOrigin
public class DesignationController {
    @Autowired
    DesignationService designationService;

    @GetMapping("/getAll")
    public List<Designation> getAll(){
        return designationService.getAllDesignation();
    }


    @GetMapping("/addDesignation")
    public void addDesg(@RequestBody Designation designation){
        designationService.addDesignation(designation);
    }
}
