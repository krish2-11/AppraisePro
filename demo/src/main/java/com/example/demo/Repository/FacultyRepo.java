package com.example.demo.Repository;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Department;
import com.example.demo.Model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacultyRepo extends JpaRepository<Faculty, String> {
    Faculty findByCredentials(Credentials credentials);
    Optional<Faculty> findByEmail(String email);
    @Transactional
    @Query("SELECT f FROM Faculty f WHERE f.department = department")
    List<Faculty> findByDepartment(Long department);
}
