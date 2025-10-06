import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchWorker = (workerId) => {
    console.log("Fetching worker data...");     
  return axios
    .get(`http://localhost:3000/worker/${workerId}`, { withCredentials: true })
    .then((res) => {
      console.log("Worker data fetched:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching worker:", err);
      throw err;
    });
};

const Booking = () => {
  const { id } = useParams();
  const token = Cookies.get("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const { data: worker, isLoading, error } = useQuery({
    queryKey: ["worker", id],
    queryFn: () => fetchWorker(id),
    staleTime: 5 * 60 * 1000,
  });

  if (!token)
    return (
      <p className="text-center text-red-500 mt-6">
        You must <span className="font-bold">Login or Sign Up</span> to book this worker!
      </p>
    );

  if (isLoading)
    return <p className="text-center text-gray-500 mt-6">Loading worker details...</p>;

  if (error instanceof Error)
    return <p className="text-red-500 text-center mt-6">Error: {error.message}</p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/book/${worker._id}`,
        form,
        { withCredentials: true }
      );
      alert("Booking successful!");
      setForm({ name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Page</h1>

      {/* Worker Details */}
      <div className="mb-6">
        <p className="mb-2"><span className="font-semibold">Name:</span> {worker.name}</p>
        <p className="mb-2"><span className="font-semibold">Services:</span> {worker.services}</p>
        <p className="mb-2"><span className="font-semibold">Experience:</span> {worker.experience}</p>
        <p className="mb-2"><span className="font-semibold">Phone:</span> {worker.phone}</p>
        <p className="mb-2"><span className="font-semibold">Address:</span> {worker.address}</p>
        <p className="mb-2"><span className="font-semibold">Language:</span> {worker.language}</p>
        <p className="mb-2"><span className="font-semibold">Gender:</span> {worker.gender}</p>
      </div>

      {/* Booking Form */}
      <form className="flex flex-col gap-3" onSubmit={handleBooking}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your Phone"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="border p-2 rounded"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
