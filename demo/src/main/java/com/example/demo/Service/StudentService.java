package com.example.demo.Service;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;

    public void saveStudents(List<Student> students) {
        List<Student> uniqueStudents = students.stream()
                .filter(student -> !studentRepository.existsByStudentId(student.getStudentId()))
                .collect(Collectors.toList());

        if (!uniqueStudents.isEmpty()) {
            studentRepository.saveAll(uniqueStudents);
        }
    }
    public boolean findById(String id){
        return studentRepository.existsByStudentId(id);
    }

}
