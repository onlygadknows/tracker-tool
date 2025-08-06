"use client";

import { useState } from "react";
import { philippineRegions, subprojectTypes } from "../lib/data";
import { useRouter } from "next/navigation";

const Form = () => {
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [subprojectType, setSubprojectType] = useState("");
  const [ancestralDomain, setAncestralDomain] = useState("");
  const [location, setLocation] = useState("");
  const [tepc, setTepc] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!region.trim()) validationErrors.region = "Set your Region";
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!subprojectType.trim())
      validationErrors.subprojectType = "Subproject Type is required";
    if (!ancestralDomain.trim())
      validationErrors.ancestralDomain = "Ancestral Domain is required";
    if (!location.trim()) validationErrors.location = "Location is required";
    if (!tepc.trim()) validationErrors.tepc = "TEPC is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      region,
      title,
      subprojectType,
      ancestralDomain,
      location,
      tepc,
    };

    try {
      localStorage.setItem("formSubmission", JSON.stringify(formData));
      setRegion("");
      setTitle("");
      setSubprojectType("");
      setAncestralDomain("");
      setLocation("");
      setTepc("");
      setErrors({});

      // Navigate to requirements
      router.push("/requirements");
    } catch (error) {
      console.error("Failed to save form data:", error);
      alert("There was an error saving the form. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 flex flex-col items-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="region"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            Select Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`bg-gray-50 border ${
              errors.region ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          >
            <option value="">Choose Region</option>
            {philippineRegions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={`bg-gray-50 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subprojectType"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            Select Subproject Type
          </label>
          <select
            id="subprojectType"
            value={subprojectType}
            onChange={(e) => setSubprojectType(e.target.value)}
            className={`bg-gray-50 border ${
              errors.subprojectType ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          >
            <option value="">Choose Subproject Type</option>
            {subprojectTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.subprojectType && (
            <p className="text-red-500 text-sm">{errors.subprojectType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="ancestralDomain"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            Ancestral Domain
          </label>
          <input
            type="text"
            id="ancestralDomain"
            value={ancestralDomain}
            onChange={(e) => setAncestralDomain(e.target.value)}
            placeholder="Ancestral Domain"
            className={`bg-gray-50 border ${
              errors.ancestralDomain ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.ancestralDomain && (
            <p className="text-red-500 text-sm">{errors.ancestralDomain}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={`bg-gray-50 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="tepc"
            className="block mt-2 text-sm font-medium text-gray-900"
          >
            TEPC (Total Estimated Project Cost)
          </label>
          <input
            type="text"
            id="tepc"
            value={tepc}
            onChange={(e) => setTepc(e.target.value)}
            placeholder="TEPC"
            className={`bg-gray-50 border ${
              errors.tepc ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          />
          {errors.tepc && <p className="text-red-500 text-sm">{errors.tepc}</p>}
        </div>

        <button
          type="submit"
          className="text-white font-geistSans bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
