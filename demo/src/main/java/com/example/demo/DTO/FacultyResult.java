package com.example.demo.DTO;

public class FacultyResult {
    String email;
    double publication;
    double events;
    double citation;
    String profileUrl;
    String name;
    double rating;

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FacultyResult() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getPublication() {
        return publication;
    }

    public void setPublication(double publication) {
        this.publication = publication;
    }

    public double getEvents() {
        return events;
    }

    public void setEvents(double events) {
        this.events = events;
    }

    public double getCitation() {
        return citation;
    }

    public void setCitation(double citation) {
        this.citation = citation;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }
}
