import React from 'react';

const Faculty = ({ data }) => {
  

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col"
    >
      <div className="p-4 flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-100 shadow-sm">
          <img
            src={`https://ui-avatars.com/api/?name=${data.firstname}&background=random&size=128`}
            alt={data.firstname + ' ' + data.lastname}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {data.firstname} {data.lastname && data.lastname}
          </h3>
          <p className="text-sm text-gray-600 truncate">{data.email}</p>
        </div>
      </div>
      
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center">
          <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
            {data.departmentName}
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex border-t border-gray-100">
        <button className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 border-r border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </button>
        <button className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Details
        </button>
      </div>
    </div>
  );
};

export default Faculty;