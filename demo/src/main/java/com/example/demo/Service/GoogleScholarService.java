package com.example.demo.Service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleScholarService {

    public Map<String, String> fetchScholarProfile(String url) {
        Map<String, String> profileData = new HashMap<>();

        try {
            Document doc = Jsoup.connect(url).get();

            // Extract Name
            Element nameElement = doc.selectFirst("#gsc_prf_in");
            profileData.put("name", nameElement != null ? nameElement.text() : "Not Available");

            // Extract Affiliation
            Element affiliationElement = doc.selectFirst(".gsc_prf_il");
            profileData.put("affiliation", affiliationElement != null ? affiliationElement.text() : "Not Available");

            // Extract Homepage URL
            Element homepageElement = doc.selectFirst("#gsc_prf_ivh .gsc_prf_ila");
            profileData.put("homepage", homepageElement != null ? homepageElement.attr("href") : "Not Available");

            // Extract Total Citations
            Element citationElement = doc.selectFirst("#gsc_rsb_st td.gsc_rsb_std");
            profileData.put("citations", citationElement != null ? citationElement.text() : "Not Available");

            // Extract University Website (Affiliated Organization Link)
            Element universityElement = doc.selectFirst(".gsc_prf_il .gsc_prf_ila");
            String universityName = universityElement != null ? universityElement.text() : "Not Available";
            String universityLink = universityElement != null ? "https://scholar.google.com" + universityElement.attr("href") : "Not Available";

            profileData.put("university_name", universityName);
            profileData.put("university_link", universityLink);

        } catch (IOException e) {
            e.printStackTrace();
            profileData.put("error", "Failed to fetch data");
        }

        return profileData;
    }
}
