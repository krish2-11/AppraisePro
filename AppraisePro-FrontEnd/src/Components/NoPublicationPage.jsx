import React from 'react'
import '../Design/NoPublicationPage.css'

const NoPublicationPage = () => {
  return (
    <div className='empty-body'>
    <div className="empty-state">
        <div className="icon-container">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                </path>
            </svg>
        </div>
        <h1>No Publications Yet</h1>
        <p>Get started by adding your first publication. You can add research papers, articles, or any other academic works.</p>
    </div>
    </div>
  )
}

export default NoPublicationPage