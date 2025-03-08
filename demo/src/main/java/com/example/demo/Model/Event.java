package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Event {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String eventName;
    String eventDescription;
    String eventType;
    String eventRole;
    LocalDate eventDate;
    String eventMode;
    String status;
    String proofName;
    String presentationName;
    LocalTime eventTime;
    @Lob
    private byte[] proofOfAttendance;
    @Lob
    private byte[] presentationSlide;
    String eventLocation;
    @ManyToOne
    @JsonBackReference
    Faculty faculty;

    public Event() {
    }

    public Event(Long id, String eventName, String eventDescription, String eventType, String eventRole, LocalDate eventDate, String eventMode, String status, String proofName, String presentationName, LocalTime eventTime, byte[] proofOfAttendance, byte[] presentationSlide, String eventLocation, Faculty faculty) {
        this.id = id;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventType = eventType;
        this.eventRole = eventRole;
        this.eventDate = eventDate;
        this.eventMode = eventMode;
        this.status = status;
        this.proofName = proofName;
        this.presentationName = presentationName;
        this.eventTime = eventTime;
        this.proofOfAttendance = proofOfAttendance;
        this.presentationSlide = presentationSlide;
        this.eventLocation = eventLocation;
        this.faculty = faculty;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getPresentationName() {
        return presentationName;
    }

    public void setPresentationName(String presentationName) {
        this.presentationName = presentationName;
    }

    public String getProofName() {
        return proofName;
    }

    public void setProofName(String proofName) {
        this.proofName = proofName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventRole() {
        return eventRole;
    }

    public void setEventRole(String eventRole) {
        this.eventRole = eventRole;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventMode() {
        return eventMode;
    }

    public void setEventMode(String eventMode) {
        this.eventMode = eventMode;
    }

    public byte[] getProofOfAttendance() {
        return proofOfAttendance;
    }

    public void setProofOfAttendance(byte[] proofOfAttendance) {
        this.proofOfAttendance = proofOfAttendance;
    }

    public byte[] getPresentationSlide() {
        return presentationSlide;
    }

    public void setPresentationSlide(byte[] presentationSlide) {
        this.presentationSlide = presentationSlide;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
