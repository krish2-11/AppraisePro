package com.example.demo.Service;

import com.example.demo.Model.Publication;
import com.example.demo.Repository.PublicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PubliationService {

    @Autowired
    PublicationRepo publicationRepo;

    public void addPublication(Publication publication){
        publicationRepo.save(publication);
    }

    public List<Publication> getUnapprovedPDFs() {
        return publicationRepo.findPendingPublications();
    }

    public List<Publication> getAcceptedPDFs() {
        return publicationRepo.findAcceptedPublications();
    }

    public List<Publication> getAllPDFs() {
        return publicationRepo.findAll();
    }

    public void updateStatus(Long id , String status){
        publicationRepo.updateStatusPublication(id , status);
    }

    public void deletePublication(Long id){
        publicationRepo.deletePublication(id);
    }
}
