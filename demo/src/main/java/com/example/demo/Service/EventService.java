package com.example.demo.Service;

import com.example.demo.Model.Event;
import com.example.demo.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    EventRepo eventRepo;

    public void saveEvent(Event e){
        eventRepo.save(e);
    }

    public List<Event> getUnapprovedEvent(){
        return eventRepo.getPendingEvent();
    }

    public List<Event> getAccpetedEvent(){
        return eventRepo.findAcceptedEvent();
    }

    public List<Event> getAllEvent(){
        return eventRepo.findAll();
    }

    public void updateStatus(Long id , String status){
        eventRepo.updateStatus(id ,  status);
    }

    public void deleteEvent(Long id){
        eventRepo.deleteEvent(id);
    }
}
