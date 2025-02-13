import React, { useState } from 'react'
import axios from 'axios'
import '../Design/PublicationList.css'

const PublicationList = ({data}) => {

    const downloadPdf =async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/publication/download/${id}`, {
              responseType: "blob",
            });
      
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `publication_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error("Error downloading the PDF:", error);
          }
    }

    return (
        <>
        {
            data.map((pub) => 
                <div className="publications-grid">
  <div className="publication-card">
    <h3>{pub[0].publicationTitle}</h3>
    <p className="publication-abstract">
    {pub[0].publicationDescription}
    </p>
    <h2 className="publication-faculty-name">By {pub[1]}</h2>
    <button
              onClick={() => downloadPdf(pub[0].id)}
              className="button-download"
            >
              Download PDF
            </button>
  </div>
</div>)
        } 
            </>
      )
}

export default PublicationList