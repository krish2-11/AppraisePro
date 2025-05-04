package com.example.demo.Service;

import com.example.demo.Model.Credentials;
import com.example.demo.Model.Department;
import com.example.demo.Model.Faculty;
import com.example.demo.Repository.FacultyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    FacultyRepo facultyRepo;
    @Autowired
    DepartmentService departmentService;

    public List<Faculty> getAllFaculty(String department){
        Department department1 = departmentService.getDepartmentByName(department);
        Long d = department1.getId();
        return facultyRepo.findByDepartment(d);
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


    public Faculty updateFaculty(Faculty f) {
        // Find faculty from DB using email
        Faculty fdb = facultyRepo.findByEmail(f.getEmail())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Update only non-null and non-zero fields
        if (f.getShortname() != null) fdb.setShortname(f.getShortname());
        if (f.getFirstname() != null) fdb.setFirstname(f.getFirstname());
        if (f.getLastname() != null) fdb.setLastname(f.getLastname());
        if (f.getFathersname() != null) fdb.setFathersname(f.getFathersname());
        if (f.getMothersname() != null) fdb.setMothersname(f.getMothersname());
        if (f.getSpousename() != null) fdb.setSpousename(f.getSpousename());
        if (f.getReligion() != null) fdb.setReligion(f.getReligion());
        if (f.getCategory() != null) fdb.setCategory(f.getCategory());
        if (f.getGender() != null) fdb.setGender(f.getGender());
        if (f.getBirthday() != null) fdb.setBirthday(f.getBirthday());
        if (f.getBloodgroup() != null) fdb.setBloodgroup(f.getBloodgroup());
        if (f.getMaritalStatus() != null) fdb.setMaritalStatus(f.getMaritalStatus());
        if (f.getCountry() != null) fdb.setCountry(f.getCountry());
        if (f.getCaste() != null) fdb.setCaste(f.getCaste());
        if (f.getHometown() != null) fdb.setHometown(f.getHometown());
        if (f.getBirthplace() != null) fdb.setBirthplace(f.getBirthplace());
        if (f.getPhone() != null) fdb.setPhone(f.getPhone());
        if (f.getSecondaryphone() != null) fdb.setSecondaryphone(f.getSecondaryphone());
        if (f.getPersonalemail() != null) fdb.setPersonalemail(f.getPersonalemail());
        if (f.getDepartmentName() != null) fdb.setDepartmentName(f.getDepartmentName());
        if (f.getDesignationName() != null) fdb.setDesignationName(f.getDesignationName());
        if (f.getPhoto() != null) fdb.setPhoto(f.getPhoto());
        if(f.getGoogleScholarUrl() != null) fdb.setGoogleScholarUrl(f.getGoogleScholarUrl());

        // Check boolean values (avoid null values)
        fdb.setDisable(true);
        fdb.setFirst(true);

        // Update nested objects
        if (f.getCredentials() != null) {
            Credentials credentials = fdb.getCredentials();
            if (f.getCredentials().getEmail() != null) credentials.setEmail(f.getCredentials().getEmail());
            if (f.getCredentials().getPassword() != null) credentials.setPassword(f.getCredentials().getPassword());
            fdb.setCredentials(credentials);
        }

        if (f.getDepartment() != null) fdb.setDepartment(f.getDepartment());
        if (f.getDesignation() != null) fdb.setDesignation(f.getDesignation());

        // Update the publications list
        if (f.getPublicationList() != null && !f.getPublicationList().isEmpty()) {
            fdb.setPublicationList(f.getPublicationList());
        }

        // Save updated faculty
        return facultyRepo.save(fdb);
    }
}
