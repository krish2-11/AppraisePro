package com.example.demo.Service;

import com.example.demo.DTO.AdminDTO;
import com.example.demo.Model.Admin;
import com.example.demo.Model.Credentials;
import com.example.demo.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    AdminRepo adminRepo;

    public List<AdminDTO> getAllAdmin(){
        List<Admin> admins =  adminRepo.findAll();
        List<AdminDTO> adminDTOS = new ArrayList<>();
        for(Admin a : admins){
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setEmail(a.getEmail());
            adminDTO.setDepartment(a.getDepartment().getName());
            adminDTO.setRole(a.getRole());
            adminDTOS.add(adminDTO);
        }
        return adminDTOS;
    }

    public void addAdmin(Admin admin){
        if(!adminRepo.existsById(admin.getEmail()))
        {
            adminRepo.save(admin);
        }
    }
    public Admin getAdmin(Credentials credentials){
        return adminRepo.findByCredentials(credentials);
    }

    public Admin getAdmin(String email){
        return adminRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + email));
    }
}
