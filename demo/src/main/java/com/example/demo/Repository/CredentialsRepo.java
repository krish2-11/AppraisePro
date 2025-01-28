package com.example.demo.Repository;

import com.example.demo.Model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CredentialsRepo extends JpaRepository<Credentials , String> {
    Credentials findByEmail(String email);
    @Modifying
    @Transactional
    @Query("UPDATE Credentials c SET c.password = :password WHERE c.email = :email")
    int updatePassword(@Param("email") String email, @Param("password") String password);
}
