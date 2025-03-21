package com.example.demo.DTO;

public class AddFacultyFormDetails {
    String email;
    String facultyid;
    String department;
    String designation;

    public AddFacultyFormDetails() {
    }

    public AddFacultyFormDetails(String email, String facultyid, String department, String designation) {
        this.email = email;
        this.facultyid = facultyid;
        this.department = department;
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacultyid() {
        return facultyid;
    }

    public void setFacultyid(String facultyid) {
        this.facultyid = facultyid;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
