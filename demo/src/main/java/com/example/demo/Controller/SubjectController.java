package com.example.demo.Controller;

import com.example.demo.Model.Subject;
import com.example.demo.Service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subject")
@CrossOrigin
public class SubjectController {
    @Autowired
    SubjectService subjectService;

    @GetMapping("/All")
    public List<Subject> getAll(){
        return subjectService.getAll();
    }
}
