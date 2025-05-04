package com.example.demo.Repository;

import com.example.demo.Model.Admin;
import com.example.demo.Model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {
    Admin findByCredentials(Credentials credentials);
    Optional<Admin> findByEmail(String email);
}
