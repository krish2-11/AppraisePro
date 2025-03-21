package com.example.demo.Repository;

import com.example.demo.Model.Designation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignationRepo extends JpaRepository<Designation,Long> {
    @Query("SELECT d FROM Designation d WHERE d.designation = :designation")
    public Designation findByName(@Param("designation")String designation);
}
