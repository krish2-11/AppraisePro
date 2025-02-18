package com.example.demo.Repository;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepo extends JpaRepository<Faculty, String> {
    Faculty findByCredentials(Credentials credentials);
    Optional<Faculty> findByEmail(String email);
}
