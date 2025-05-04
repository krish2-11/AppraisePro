package com.example.demo.Controller;

import com.example.demo.DTO.FacultyResult;
import com.example.demo.Model.Admin;
import com.example.demo.Model.Faculty;
import com.example.demo.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class EvaluationController {

    @Autowired
    FacultyService facultyService;
    @Autowired
    AdminService adminService;
    @Autowired
    PubliationService publicationService;
    @Autowired
    EventService eventService;
    @Autowired
    GoogleScholarService googleScholarService;

    @GetMapping("/evaluate/{email}")
    List<FacultyResult> getResult(@PathVariable String email){
        Admin a = adminService.getAdmin(email);
        String name = a.getDepartment().getName();
        List<Faculty> faculties = facultyService.getAllFaculty(name);
        List<FacultyResult> facultyResults = new ArrayList<>();

        for (Faculty faculty : faculties) {
            String email1 = faculty.getEmail();
            String name1 = faculty.getFirstname() + " " + faculty.getLastname();
            String profileUrl = faculty.getGoogleScholarUrl();

            // Count accepted publications
            double publicationCount = publicationService.getAcceptedPDFs().stream().filter((p) -> (p.getFaculty().getEmail().equals(email1))).count();

            // Count accepted events
            double eventCount = eventService.getAccpetedEvent().stream().filter((p) -> (p.getFaculty().getEmail().equals(email1))).count();

            // Fetch citation count from Google Scholar profile
            String citationCount = "0";
            if (profileUrl != null && !profileUrl.isEmpty()) {
                Map<String, String> scholarData = googleScholarService.fetchScholarProfile(profileUrl);
                citationCount = scholarData.getOrDefault("citations", "0");
            }
            double citation = Double.parseDouble(citationCount);

            // Create FacultyResult object
            FacultyResult result = new FacultyResult();
            result.setProfileUrl(profileUrl);
            result.setName(name1);
            result.setEmail(email1);
            result.setCitation(citation);
            result.setPublication(publicationCount);
            result.setEvents(eventCount);
            double rating = (citation * 0.25) + (publicationCount * 0.15) + (eventCount * 0.3);
            result.setRating(rating);
            facultyResults.add(result);
            System.out.println(citation);
            System.out.println(rating);
            System.out.println(publicationCount);
            System.out.println(eventCount);
        }

        return facultyResults;
    }

}
