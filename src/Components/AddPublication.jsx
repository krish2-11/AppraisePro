import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Tag, FileText, BookOpen, AlertCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import researchtags from '../data/researchtags'

const AddPublication = () => {
  const [publicationData, setpublicationData] = useState({
    status: 'Pending',
    publicationTitle: '',
    publicationDescription: '',
    tags: []
  })
  const getEmail = localStorage.getItem('email')
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setpublicationData({ ...publicationData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleTagSelect = (tag) => {
    setpublicationData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post('http://localhost:8080/publication/addfaculty', {
        email: getEmail,
        password: ""
      });
      await axios.post('http://localhost:8080/publication/add', publicationData);
      await axios.post("http://localhost:8080/publication/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Publication submitted successfully!");
      navigate('/faculty/home');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add publication. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-indigo-600 py-4 px-6">
            <h1 className="text-2xl font-bold text-white">Add Publication</h1>
          </div>

          <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Publication Information</h2>
              
              <div className="mb-6">
                <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="publicationTitle">
                  <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
                  Publication Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="publicationTitle"
                  name="publicationTitle"
                  onChange={handleChange}
                  placeholder="Enter publication title"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="publicationDescription">
                  <AlertCircle className="w-4 h-4 mr-2 text-indigo-500" />
                  Publication Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="publicationDescription"
                  name="publicationDescription"
                  onChange={handleChange}
                  placeholder="Enter publication description"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-none"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center text-gray-700 text-sm font-medium mb-2" htmlFor="publicationFile">
                <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                Upload PDF <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF files only</p>
                  </div>
                  <input 
                    id="publicationFile" 
                    type="file" 
                    accept="application/pdf" 
                    className="hidden" 
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            
            <div className="mb-8">
              <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                Select Tags (Multiple)
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {researchtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagSelect(tag)}
                    className={`flex items-center text-sm px-3 py-1.5 rounded-full transition-colors duration-200 ${
                      publicationData.tags.includes(tag)
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                Submit Publication
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default AddPublication