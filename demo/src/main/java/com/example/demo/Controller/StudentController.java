package com.example.demo.Controller;

import com.example.demo.DTO.StudentDTO;
import com.example.demo.Model.Student;
import com.example.demo.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {
    @GetMapping("/login/{email}")
    public String login(@PathVariable String email){
       String id = email.substring(0 , email.lastIndexOf('@'));
       if(studentService.findById(id)){
           return "Authenticated";
       }
       else{
           return "Not Authenticated";
       }
    }

    @Autowired
    private StudentService studentService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadStudents(@RequestBody List<StudentDTO> students) {
        List<Student> students1 = new ArrayList<>();
        for(StudentDTO studentDTO : students){
            Student student = new Student();
            student.setName(studentDTO.getName());
            student.setStudentId(studentDTO.getStudentId());
            student.setYear(studentDTO.getYear());
            student.setSemester(studentDTO.getSemester());
            student.setRollNo(studentDTO.getRollNo());
            students1.add(student);
        }
        studentService.saveStudents(students1);
        return ResponseEntity.ok("Students uploaded successfully");
    }
}
