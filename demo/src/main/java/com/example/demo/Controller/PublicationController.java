package com.example.demo.Controller;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Model.Publication;
import com.example.demo.Service.CredentialsService;
import com.example.demo.Service.FacultyService;
import com.example.demo.Service.PubliationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/publication")
@CrossOrigin
public class PublicationController {

    @Autowired
    PubliationService publicationService;
    @Autowired
    CredentialsService credentialsService;
    @Autowired
    FacultyService facultyService;

    Faculty faculty;
    Publication publicationDetail;

    @PostMapping("/add")
    public void addPublication(@RequestBody Publication publication){
        publicationDetail = new Publication();
        publicationDetail.setPublicationTitle(publication.getPublicationTitle());
        publicationDetail.setPublicationDescription(publication.getPublicationDescription());
        publicationDetail.setStatus(publication.getStatus());
    }

    @PostMapping("/addfaculty")
    public void addPublicationFaculty(@RequestBody Credentials credential){
        Credentials credentials = credentialsService.findCredentials(credential.getEmail());
        faculty = facultyService.getFaculty(credentials);
    }

    @PostMapping("/upload")
    public void addPdf(@RequestParam("file") MultipartFile file) throws IOException {
        publicationDetail.setFileName(file.getOriginalFilename());
        publicationDetail.setFileData(file.getBytes());
        publicationDetail.setFaculty(faculty);
        publicationService.addPublication(publicationDetail);
    }

    @GetMapping("/accept/{id}")
    public void acceptPublication(@PathVariable Long id){
        publicationService.updateStatus(id , "Accepted");
    }

    @GetMapping("/reject/{id}")
    public void rejectPublication(@PathVariable Long id){
        publicationService.deletePublication(id);
    }

    @GetMapping("/unapproved")
    public List<List<Object>> getUnapprovedPDFs() {
        List<Publication> data = publicationService.getUnapprovedPDFs();
        List<List<Object>> details = new ArrayList<>();
        for(Publication p : data){
            String fname = p.getFaculty().getFirstname();
            String lname = p.getFaculty().getLastname();
            String name = fname + " " + lname;
            List<Object> l = new ArrayList<Object>();
            l.add(p);
            l.add(name);
            details.add(l);
        }
        return details;
    }

    @GetMapping("/accepted/{email}")
    public List<Publication> getAcceptedPDFs(@PathVariable String email) {
        return publicationService.getAcceptedPDFs()
                .stream()
                .filter(pub -> pub.getFaculty().getEmail().equals(email))
                .toList();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadPDF(@PathVariable Long id) {
        Publication pdf = publicationService.getUnapprovedPDFs().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (pdf == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + pdf.getFileName()) // Open in browser
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.getFileData());
    }
}
