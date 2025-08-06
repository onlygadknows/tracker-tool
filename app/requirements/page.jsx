"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Requirements = () => {
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [savedForms, setSavedForms] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formSubmission"));

    if (!stored) {
      router.push("/");
    } else {
      setSavedForms([stored]);
    }
  }, []);

  console.log(savedForms);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus("");

    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    // const formData = new FormData();
    // formData.append("file", selectedFile);
    const file = inputFileRef.current.files[0];

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "content-type": file?.type || "application/octet-stream",
        },
        body: file,
      }).then(async (res) => {
        if (res.status === 200) {
          const blobResult = await res.json();
          setUploadStatus("success", blobResult);
        }
      });

      // if (res.ok) {
      //   const result = await res.json();
      //   console.log("Upload result:", result);
      //   setUploadStatus("success");
      // } else {
      //   const err = await res.json();
      //   console.error("Upload failed:", err);
      //   setUploadStatus("error");
      // }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="space-y-8 w-full max-w-md">
        {savedForms.length > 0 && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg text-gray-900 font-mono mb-2">
              Saved Submission
            </h2>
            <ul className="space-y-3">
              {savedForms.map((form, index) => (
                <li
                  key={index}
                  className="border p-3 rounded text-sm bg-gray-50"
                >
                  <p className="text-gray-800 font-mono">Title: {form.title}</p>
                  <p className="text-gray-800 font-mono">
                    Region: {form.region}
                  </p>
                  <p className="text-gray-800 font-mono">
                    Type: {form.subprojectType}
                  </p>
                  <p className="text-gray-800 font-mono">TEPC: {form.tepc}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-mono">
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
                <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)}{" "}
                KB
              </p>
            </div>
          )}

          {previewUrl && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
              <iframe
                src={previewUrl}
                width="100%"
                height="300px"
                title="PDF Preview"
                className="border rounded"
              />
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
    </div>
  );
};

export default Requirements;
