package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Model.Event;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.EventService;
import com.example.demo.Service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/event")
@CrossOrigin
public class EventController {

    @Autowired
    EventService eventService;
    @Autowired
    CredentialsService credentialsService;
    @Autowired
    FacultyService facultyService;

    Faculty faculty;
    Event eventDetail;
    @PostMapping("/addFaculty")
    public void addEvent(@RequestBody Credentials credential){
        Credentials credentials = credentialsService.findCredentials(credential.getEmail());
        faculty = facultyService.getFaculty(credentials);
    }

    @PostMapping("/add")
    public void addEvent(@RequestBody Event event){
        eventDetail = event;
        eventDetail.setStatus("Pending");
    }
    @PostMapping("/upload")
    public void addPdf(@RequestParam("proof") MultipartFile proof ,@RequestParam(value = "slides" , required = false) MultipartFile slides) throws IOException {
        eventDetail.setProofName(proof.getOriginalFilename());
        eventDetail.setProofOfAttendance(proof.getBytes());
        if(slides != null) {
            eventDetail.setPresentationName(slides.getOriginalFilename());
            eventDetail.setProofOfAttendance(slides.getBytes());
        }
        eventDetail.setFaculty(faculty);
        eventService.saveEvent(eventDetail);
    }

    @GetMapping("/accept/{id}")
    public void acceptPublication(@PathVariable Long id){
        eventService.updateStatus(id , "Accepted");
    }

    @GetMapping("/reject/{id}")
    public void rejectPublication(@PathVariable Long id){
        eventService.deleteEvent(id);
    }

//    @GetMapping("/approved")
//    public List<List<Object>> getApprovedPDFs() {
//        List<Publication> data = publicationService.getAcceptedPDFs();
//        List<List<Object>> details = new ArrayList<>();
//        for(Publication p : data){
//            String fname = p.getFaculty().getFirstname();
//            String lname = p.getFaculty().getLastname();
//            String name = fname + " " + lname;
//            List<Object> l = new ArrayList<Object>();
//            l.add(p);
//            l.add(name);
//            details.add(l);
//        }
//        return details;
//    }

    @GetMapping("/unapproved")
    public List<List<Object>> getUnapprovedEvent() {
        List<Event> data = eventService.getUnapprovedEvent();
        List<List<Object>> details = new ArrayList<>();
        for(Event e : data){
            String fname = e.getFaculty().getFirstname();
            String lname = e.getFaculty().getLastname();
            String name = fname + " " + lname;
            List<Object> l = new ArrayList<Object>();
            l.add(e);
            l.add(name);
            details.add(l);
        }
        return details;
    }

    @GetMapping("/accepted/{email}")
    public List<Event> getAcceptedEvent(@PathVariable String email) {
        return eventService.getAccpetedEvent()
                .stream()
                .filter(pub -> pub.getFaculty().getEmail().equals(email))
                .toList();
    }

    @GetMapping("/getAll")
    public List<Event> getAllEvents(){
        return eventService.getAccpetedEvent();
    }

    @GetMapping("/download/proof/{id}")
    public ResponseEntity<byte[]> downloadProof(@PathVariable Long id) {
        Event pdf = eventService.getAllEvent().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (pdf == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + pdf.getProofName()) // Open in browser
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.getProofOfAttendance());
    }

    @GetMapping("/download/presentation/{id}")
    public ResponseEntity<byte[]> downloadSlides(@PathVariable Long id) {
        Event pdf = eventService.getAllEvent().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (pdf == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + pdf.getPresentationName()) // Open in browser
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.getPresentationSlide());
    }
}
