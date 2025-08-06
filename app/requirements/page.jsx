"use client";

import React, { useRef, useState, useEffect } from "react";

const Requirements = () => {
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [savedForms, setSavedForms] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formSubmissions")) || [];
    setSavedForms(stored);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus("");
    console.log("Selected file:", file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputFileRef.current?.files?.length) {
      alert("No file selected");
      return;
    }

    const file = inputFileRef.current.files[0];
    console.log("Uploading file:", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/pdf",
        },
        body: file,
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Upload result:", result);
        setUploadStatus("success");
        alert("File uploaded successfully!");
      } else {
        setUploadStatus("error");
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      alert("Error uploading file");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 px-4">
      {savedForms.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded shadow-md max-w-sm w-full">
          <h2 className="text-lg text-gray-900 font-semibold mb-2">
            Saved Submissions
          </h2>
          <ul className="space-y-3">
            {savedForms.map((form, index) => (
              <li key={index} className="border p-3 rounded text-sm bg-gray-50">
                <p className="text-gray-800">Title: {form.title}</p>
                <p className="text-gray-800">Region: {form.region}</p>
                <p className="text-gray-800">Type: {form.subprojectType}</p>
                <p className="text-gray-800">TEPC: {form.tepc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-full max-w-md space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MOA w/ LGU <span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            ref={inputFileRef}
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />
        </div>

        {selectedFile && (
          <div className="text-sm text-gray-600 mt-2">
            <p>
              <strong>Selected:</strong> {selectedFile.name}
            </p>
            <p>
              <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Submit
        </button>

        {uploadStatus === "success" && (
          <p className="text-green-600 text-sm">Upload successful!</p>
        )}
        {uploadStatus === "error" && (
          <p className="text-red-600 text-sm">
            Upload failed. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Requirements;
