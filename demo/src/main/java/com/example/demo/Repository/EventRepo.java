package com.example.demo.Repository;

import com.example.demo.Model.Event;
import com.example.demo.Model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

    @Transactional
    @Query("SELECT e FROM Event e WHERE e.status = 'Pending'")
    public List<Event> getPendingEvent();

    @Modifying
    @Transactional
    @Query("UPDATE Event e SET e.status=:status WHERE e.id=:id")
    public void updateStatus(@Param("id")Long id , @Param("status") String status);

    @Transactional
    @Query("SELECT e FROM Event e WHERE e.status = 'Accepted'")
    List<Event> findAcceptedEvent();

    @Modifying
    @Transactional
    @Query("DELETE Event e WHERE e.id=:id")
    void deleteEvent(@Param("id")Long id);
}
