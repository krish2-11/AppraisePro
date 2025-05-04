import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyDashBoard = () => {
  const getEmail = localStorage.getItem("email");
  const [faculty, setFaculty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      if (!getEmail) {
        console.error("No email found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const getResponse = await axios.get(
          `http://localhost:8080/login/faculty/getfaculty/${getEmail}`
        );
        console.log(getResponse.data);
        setFaculty(getResponse.data);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, [getEmail]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No faculty data found</p>
      </div>
    );
  }

  const imageSrc = faculty.photo
    ? `data:image/jpeg;base64,${faculty.photo}`
    : "/api/placeholder/800/400";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 flex justify-center md:justify-start">
            <img
              className="h-48 w-48 object-cover rounded-full m-6 border-4 border-indigo-50 shadow"
              src={imageSrc}
              alt="Faculty"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {faculty.firstname} {faculty.lastname}
            </h1>
            <p className="text-indigo-600 text-lg font-medium mt-1">
              {faculty.shortname}
            </p>
            <div className="mt-3 flex space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {faculty.designationName}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {faculty.departmentName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Basic Information
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">First Name:</span>
              <span className="text-gray-800">{faculty.firstname}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Last Name:</span>
              <span className="text-gray-800">{faculty.lastname}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Father's Name:</span>
              <span className="text-gray-800">{faculty.fathersname}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Mother's Name:</span>
              <span className="text-gray-800">{faculty.mothersname}</span>
            </div>
            {faculty.maritalStatus === "Married" && (
              <div className="flex">
                <span className="text-gray-600 font-medium w-1/3">Spouse Name:</span>
                <span className="text-gray-800">{faculty.spousename}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Professional Details
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">ID:</span>
              <span className="text-gray-800">{faculty.id}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Department:</span>
              <span className="text-gray-800">{faculty.departmentName}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Designation:</span>
              <span className="text-gray-800">{faculty.designationName}</span>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Personal Details
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Religion:</span>
              <span className="text-gray-800">{faculty.religion}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Category:</span>
              <span className="text-gray-800">{faculty.category}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Gender:</span>
              <span className="text-gray-800">{faculty.gender}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Date of Birth:</span>
              <span className="text-gray-800">{faculty.birthday}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Blood Group:</span>
              <span className="text-gray-800">{faculty.bloodgroup}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Marital Status:</span>
              <span className="text-gray-800">{faculty.maritalStatus}</span>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Location Information
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Country:</span>
              <span className="text-gray-800">{faculty.country}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Caste:</span>
              <span className="text-gray-800">{faculty.caste}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Hometown:</span>
              <span className="text-gray-800">{faculty.hometown}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Birthplace:</span>
              <span className="text-gray-800">{faculty.birthplace}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Contact Information
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Phone:</span>
              <span className="text-gray-800">{faculty.phone}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Secondary Phone:</span>
              <span className="text-gray-800">{faculty.secondaryphone}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Personal Email:</span>
              <span className="text-gray-800">{faculty.personalemail}</span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Additional Information
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-600 font-medium w-1/3">Person with Disability:</span>
              <span className="text-gray-800">{faculty.disable ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashBoard;