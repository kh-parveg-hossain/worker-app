import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv';
dotenv.config();
const fetchWorkers = (serviceName) => {
  return axios
    .get(`${process.env.APP_URL}/List-Services/${serviceName}`)
    .then((res) => res.data.workers);
};

const WorkerServices = () => {
  const [service, setService] = useState("Cleaning");
  const navigate = useNavigate(); // ✅ Top-level hook

  const { data, isLoading, error } = useQuery({
    queryKey: ["workers", service],
    queryFn: () => fetchWorkers(service),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  if (error instanceof Error) return <p className="text-red-500">Error: {error.message}</p>;

  const handleView = () => {
    alert("View button clicked!");
  };

  const handleBook = (_id) => {
  
    navigate(`/book/${_id}`); // ✅ Use navigate here
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Worker Services</h1>

      {/* Service buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          "Cleaning",
          "Baby Care",
          "Governess",
          "Cook",
          "Elder Care",
          "Nurse",
          "Maternal and Newborn Care",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setService(s)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              s === service
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Workers List */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading workers...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            data.map((worker) => (
              <div
                key={worker._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>
                  <p className="text-gray-700"><span className="font-medium">Services:</span> {worker.services}</p>
                  <p className="text-gray-700"><span className="font-medium">Experience:</span> {worker.experience}</p>
                  <p className="text-gray-700"><span className="font-medium">Religion:</span> {worker.religion}</p>
                  <p className="text-gray-700"><span className="font-medium">Age:</span> {worker.age}</p>
                  <p className="text-gray-700"><span className="font-medium">State:</span> {worker.state}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handleView}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleBook(worker._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WorkerServices;
