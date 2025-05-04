package com.example.demo.DTO;

public class AdminDTO {
    String email;
    String role;
    String department;
    String designation;
    String facultyid;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public AdminDTO() {
    }

    public AdminDTO(String email, String ROLE, String department, String designation, String facultyid) {
        this.email = email;
        this.role = ROLE;
        this.department = department;
        this.designation = designation;
        this.facultyid = facultyid;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getFacultyid() {
        return facultyid;
    }

    public void setFacultyid(String facultyid) {
        this.facultyid = facultyid;
    }
}
