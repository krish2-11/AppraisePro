import React, { useState } from "react";
import Papa from "papaparse";
import ExcelJS from "exceljs";
import axios from "axios";
import { saveAs } from "file-saver";
import { Upload, FileText, Download, Send } from 'lucide-react';

const AddStudent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const requiredFields = ["studentId", "name", "department", "rollNo", "semester", "year"];

  const validateHeaders = (headers) => {
    return requiredFields.every((field) => headers.includes(field));
  };

  const onDownloadTemplate = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");
    worksheet.addRow(requiredFields); // Add headers

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "student_template.xlsx");
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setError("");
      setSuccessMessage("");
      setData([]);

      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              setIsError(true);
              setError("Error parsing CSV file. Please check the format.");
            } else if (!validateHeaders(results.meta.fields)) {
              setIsError(true);
              setError(`The file must contain the following columns: ${requiredFields.join(", ")}`);
            } else {
              setIsError(false);
              setData(results.data);
              console.log(results.data);
            }
          },
        });
      } else if (file.type.includes("spreadsheet") || file.name.endsWith(".xlsx")) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const buffer = e.target.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);

          const worksheet = workbook.worksheets[0];
          const jsonData = [];
          const headers = [];

          // Read headers
          worksheet.getRow(1).eachCell((cell) => {
            headers.push(cell.value);
          });

          // Validate headers
          if (!validateHeaders(headers)) {
            setIsError(true);
            setError(`The file must contain the following columns: ${requiredFields.join(", ")}`);
            return;
          }

          // Read rows
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row
              const rowData = {};
              row.eachCell((cell, colNumber) => {
                rowData[headers[colNumber - 1]] = cell.value;
              });
              jsonData.push(rowData);
            }
          });

          setIsError(false);
          setData(jsonData);
          console.log(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setIsError(true);
        setError("Please upload a valid CSV or Excel file.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/student/upload", data);
      if (response.status === 200) {
        setSuccessMessage("Data submitted successfully!");
        setData([]);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        Upload and Submit Student Data
      </h2>
    </div>

    <div className="bg-gray-50 border-2 border-dashed border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <button 
          onClick={onDownloadTemplate} 
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          <Download className="mr-2 w-5 h-5" />
          Download Template
        </button>

        <div className="relative w-full md:w-auto">
          <input 
            type="file" 
            accept=".csv,.xlsx" 
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex items-center justify-center w-full md:w-auto px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition duration-300 ease-in-out">
            <Upload className="mr-2 w-5 h-5" />
            Upload File
          </div>
        </div>
      </div>
    </div>

    {isError && (
      <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      </div>
    )}

    {successMessage && (
      <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4">
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </p>
      </div>
    )}

    {data.length > 0 && (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Uploaded Data</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {requiredFields.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition duration-150">
                  {requiredFields.map((field, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                    >
                      {row[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 text-right">
          <button 
            onClick={handleSubmit} 
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            <Send className="mr-2 w-5 h-5" />
            Submit Data
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default AddStudent;
