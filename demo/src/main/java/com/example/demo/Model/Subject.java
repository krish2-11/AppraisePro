package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int semester;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

//    @JsonIgnore
//    @ManyToMany(mappedBy = "subjects")
//    private List<Student> students;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "faculty_subject",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "faculty_id")
    )
    private List<Faculty> facultyMembers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

//    public List<Student> getStudents() {
//        return students;
//    }
//
//    public void setStudents(List<Student> students) {
//        this.students = students;
//    }

    public List<Faculty> getFacultyMembers() {
        return facultyMembers;
    }

    public void setFacultyMembers(List<Faculty> facultyMembers) {
        this.facultyMembers = facultyMembers;
    }
}
