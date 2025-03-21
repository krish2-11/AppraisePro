package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Faculty {
    @Id
    String email;
    String Id;
    String shortname;
    String firstname;
    String lastname;
    String fathersname;
    String mothersname;
    String spousename;
    String religion;
    String category;
    String gender;
    LocalDate birthday;
    String bloodgroup;
    String maritalStatus;
    String country;
    String caste;
    String hometown;
    String birthplace;
    String phone;
    String secondaryphone;
    String personalemail;
    boolean isDisable;
    boolean first;
    String departmentName;
    String googleScholarUrl;

    public String getGoogleScholarUrl() {
        return googleScholarUrl;
    }

    public void setGoogleScholarUrl(String googleScholarUrl) {
        this.googleScholarUrl = googleScholarUrl;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    String designationName;
    @Lob
    private byte[] photo;

    public Faculty() {
    }

    public Faculty(String email, String id, String shortname, String firstname, String lastname, String fathersname, String mothersname, String spousename, String religion, String category, String gender, LocalDate birthday, String bloodgroup, String maritalStatus, String country, String caste, String hometown, String birthplace, String phone, String secondaryphone, String personalemail, boolean isDisable, boolean first, String departmentName, String googleScholarUrl, String designationName, byte[] photo, Credentials credentials, Department department, Designation designation, List<Publication> publicationList) {
        this.email = email;
        Id = id;
        this.shortname = shortname;
        this.firstname = firstname;
        this.lastname = lastname;
        this.fathersname = fathersname;
        this.mothersname = mothersname;
        this.spousename = spousename;
        this.religion = religion;
        this.category = category;
        this.gender = gender;
        this.birthday = birthday;
        this.bloodgroup = bloodgroup;
        this.maritalStatus = maritalStatus;
        this.country = country;
        this.caste = caste;
        this.hometown = hometown;
        this.birthplace = birthplace;
        this.phone = phone;
        this.secondaryphone = secondaryphone;
        this.personalemail = personalemail;
        this.isDisable = isDisable;
        this.first = first;
        this.departmentName = departmentName;
        this.googleScholarUrl = googleScholarUrl;
        this.designationName = designationName;
        this.photo = photo;
        this.credentials = credentials;
        this.department = department;
        this.designation = designation;
        this.publicationList = publicationList;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFathersname() {
        return fathersname;
    }

    public void setFathersname(String fathersname) {
        this.fathersname = fathersname;
    }

    public String getMothersname() {
        return mothersname;
    }

    public void setMothersname(String mothersname) {
        this.mothersname = mothersname;
    }

    public String getSpousename() {
        return spousename;
    }

    public void setSpousename(String spousename) {
        this.spousename = spousename;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getBloodgroup() {
        return bloodgroup;
    }

    public void setBloodgroup(String bloodgroup) {
        this.bloodgroup = bloodgroup;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public String getSecondaryphone() {
        return secondaryphone;
    }

    public void setSecondaryphone(String secodaryphone) {
        this.secondaryphone = secodaryphone;
    }

    public String getPersonalemail() {
        return personalemail;
    }

    public void setPersonalemail(String personalemail) {
        this.personalemail = personalemail;
    }

    public boolean isDisable() {
        return isDisable;
    }

    public void setDisable(boolean disable) {
        isDisable = disable;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @OneToOne
    Credentials credentials;

    @ManyToOne
    @JsonIgnore
    Department department;

    @ManyToOne
    @JsonIgnore
    Designation designation;

    @OneToMany(mappedBy = "faculty", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    List<Publication> publicationList;


    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Designation getDesignation() {
        return designation;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public List<Publication> getPublicationList() {
        return publicationList;
    }

    public void setPublicationList(List<Publication> publicationList) {
        this.publicationList = publicationList;
    }
}
