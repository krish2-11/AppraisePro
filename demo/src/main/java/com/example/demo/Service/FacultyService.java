package com.example.demo.Service;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Faculty;
import com.example.demo.Repository.FacultyRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    FacultyRepo facultyRepo;

    public List<Faculty> getAllFaculty(){
        return facultyRepo.findAll();
    }

    public void addFaculty(Faculty faculty){
        if(!facultyRepo.existsById(faculty.getEmail()))
        {
            facultyRepo.save(faculty);
        }
    }


    public Faculty getFaculty(Credentials credentials){
        return facultyRepo.findByCredentials(credentials);
    }

    public Faculty getFacultyById(String email){
        return facultyRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Faculty not found with email: " + email));
    }


    public Faculty updateFaculty(Faculty updatedFaculty) {
        Faculty existingFaculty = facultyRepo.findById(updatedFaculty.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Faculty not found with email: " + updatedFaculty.getEmail()));

            // Update fields except email and credentials (password)
            existingFaculty.setShortname(updatedFaculty.getShortname());
            existingFaculty.setFirstname(updatedFaculty.getFirstname());
            existingFaculty.setLastname(updatedFaculty.getLastname());
            existingFaculty.setFathersname(updatedFaculty.getFathersname());
            existingFaculty.setMothersname(updatedFaculty.getMothersname());
            existingFaculty.setSpousename(updatedFaculty.getSpousename());
            existingFaculty.setReligion(updatedFaculty.getReligion());
            existingFaculty.setCategory(updatedFaculty.getCategory());
            existingFaculty.setGender(updatedFaculty.getGender());
            existingFaculty.setBirthday(updatedFaculty.getBirthday());
            existingFaculty.setBloodgroup(updatedFaculty.getBloodgroup());
            existingFaculty.setMaritalStatus(updatedFaculty.getMaritalStatus());
            existingFaculty.setCountry(updatedFaculty.getCountry());
            existingFaculty.setCaste(updatedFaculty.getCaste());
            existingFaculty.setHometown(updatedFaculty.getHometown());
            existingFaculty.setBirthplace(updatedFaculty.getBirthplace());
            existingFaculty.setPhone(updatedFaculty.getPhone());
            existingFaculty.setSecodaryphone(updatedFaculty.getSecodaryphone());
            existingFaculty.setPersonalemail(updatedFaculty.getPersonalemail());
            existingFaculty.setDisable(updatedFaculty.isDisable());
            existingFaculty.setPhoto(updatedFaculty.getPhoto());
            existingFaculty.setFirst(true);

            // Save updated details
            return facultyRepo.save(existingFaculty);
    }
}
