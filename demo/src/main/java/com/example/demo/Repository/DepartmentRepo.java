package com.example.demo.Repository;

import com.example.demo.Model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepo extends JpaRepository<Department,Long> {
    @Query("SELECT d FROM Department d WHERE d.name = :name")
    public Department findByName(@Param("name")String name);
}
