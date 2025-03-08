import React, { useState } from "react";
import '../Design/FacultyScholarProfile.css';

const FacultyScholarProfile = () => {
  const [scholarUrl, setScholarUrl] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  const fetchScholarProfile = async () => {
    setError(""); 
    setProfileData(null);

    if (!scholarUrl.includes("scholar.google.com/citations")) {
      setError("❌ Please enter a valid Google Scholar profile URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/scholar/getProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileUrl: scholarUrl }), // Ensure correct request body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setProfileData(data);
    } catch (err) {
      setError(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Google Scholar Profile Lookup</h2>
        <input
          type="text"
          placeholder="Enter Google Scholar Profile URL"
          value={scholarUrl}
          onChange={(e) => setScholarUrl(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchScholarProfile} className="fetch-button">
          Fetch Profile
        </button>

        {error && <p className="error-message">{error}</p>}

        {profileData && (
          <div className="profile-info">
            <h3>🔹 {profileData.name}</h3>
            <p><strong>🏢 Affiliation:</strong> {profileData.affiliation}</p>
            <p><strong>📊 Citations:</strong> {profileData.citations}</p>
            
            {profileData.homepage && (
              <p>
                <strong>🌐 Website:</strong>{" "}
                <a href={profileData.homepage} target="_blank" rel="noopener noreferrer">
                  {profileData.homepage}
                </a>
              </p>
            )}

            {profileData.university_name && (
              <p>
                <strong>🏫 University:</strong>{" "}
                <a href={profileData.university_link} target="_blank" rel="noopener noreferrer">
                  {profileData.university_name}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyScholarProfile;
