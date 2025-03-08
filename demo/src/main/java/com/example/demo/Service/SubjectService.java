package com.example.demo.Service;

import com.example.demo.Model.Subject;
import com.example.demo.Repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    SubjectRepo subjectRepo;

    public List<Subject> getAll(){
        return subjectRepo.findAll();
    }
}
