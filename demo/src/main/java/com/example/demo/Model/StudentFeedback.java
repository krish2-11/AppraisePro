package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
public class StudentFeedback {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail;

    @OneToOne
    private Faculty faculty;

    private String LectureOrLab;


}
