import React from 'react'
import '../Design/PublicationCard.css'

const PublicationCard = ({data}) => {
  return (
    <>
    {
        data.map((pub) => 
            <div className="publications-grid">
        <div className="publication-card">
            <h3>{pub.publicationTitle}</h3>
            <p className="publication-abstract">
                {pub.publicationDescription}
            </p>
            <div className="tags">
                <span className="tag">Deep Learning</span>
                <span className="tag">NLP</span>
                <span className="tag">Transformers</span>
            </div>
        </div>
    </div>)
    }
            
        </>
  )
}

export default PublicationCard