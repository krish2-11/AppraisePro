package com.example.demo.Repository;

import com.example.demo.Model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PublicationRepo extends JpaRepository<Publication, Long> {
    @Transactional
    @Query("SELECT p FROM Publication p WHERE p.status = 'Pending'")
    List<Publication> findPendingPublications();

    @Transactional
    @Query("SELECT p FROM Publication p WHERE p.status = 'Accepted'")
    List<Publication> findAcceptedPublications();

    @Modifying
    @Transactional
    @Query("UPDATE Publication p SET p.status=:status WHERE p.id=:id")
    void updateStatusPublication(@Param("id")Long id , @Param("status") String status);

    @Modifying
    @Transactional
    @Query("DELETE Publication p WHERE p.id=:id")
    void deletePublication(@Param("id")Long id);
}
