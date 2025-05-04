package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    String email;

    @OneToOne(fetch = FetchType.EAGER)
    Credentials credentials;

    String role;
    @ManyToOne
    @JsonIgnore
    Department department;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String ROLE) {
        this.role = ROLE;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Admin(String email, Credentials credentials, String role, Department department) {
        this.email = email;
        this.credentials = credentials;
        this.role = role;
        this.department = department;
    }

    public Admin() {
    }

}
