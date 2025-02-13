package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Publication {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String fileName;
    private String publicationTitle;
    private String status;
    private String[] tags;

    public Publication() {
    }

    public Publication(Long id, String fileName, String publicationTitle, String status, String[] tags, String publicationDescription, byte[] fileData, Faculty faculty) {
        this.id = id;
        this.fileName = fileName;
        this.publicationTitle = publicationTitle;
        this.status = status;
        this.tags = tags;
        this.publicationDescription = publicationDescription;
        this.fileData = fileData;
        this.faculty = faculty;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPublicationDescription() {
        return publicationDescription;
    }

    public void setPublicationDescription(String publicationDescription) {
        this.publicationDescription = publicationDescription;
    }

    public String getPublicationTitle() {
        return publicationTitle;
    }

    public void setPublicationTitle(String publicationTitle) {
        this.publicationTitle = publicationTitle;
    }

    private String publicationDescription;
    @Lob
    private byte[] fileData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    @ManyToOne
    @JsonBackReference
    Faculty faculty;

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
