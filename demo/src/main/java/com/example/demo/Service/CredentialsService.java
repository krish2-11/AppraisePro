package com.example.demo.Service;

import com.example.demo.Model.Credentials;
import com.example.demo.Repository.CredentialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CredentialsService {

    @Autowired
    CredentialsRepo credentialsRepo;

    public void saveCredentials(Credentials credentials){
        if(!credentialsRepo.existsById(credentials.getEmail()))
        {
            credentialsRepo.save(credentials);
        }
    }

    public Credentials findCredentials(String email){
        return credentialsRepo.findByEmail(email);
    }

    public String updatePassword(String email, String newPassword) {
        int rowsUpdated = credentialsRepo.updatePassword(email, newPassword);

        if (rowsUpdated > 0) {
            return "Password updated successfully for email: " + email;
        } else {
            throw new RuntimeException("Email not found: " + email);
        }
    }
}



