import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_APP_URL;

const SignUp = ({ isOpen, onClose, setToken }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signupMutation = useMutation({
    mutationFn: (newUser) =>
      axios.post(`${API_URL}/signup`, newUser, {
        withCredentials: true,
      }),
    onSuccess: (res) => {
      alert("Signup successful!");
      setForm({ name: "", email: "", password: "" });
      Cookies.set("token", res.data.token, { expires: 1 });
      setToken(res.data.token); // ✅ Update Navbar state
      onClose();
    },
    onError: (err) =>
      alert(err.response?.data?.message || "Signup failed. Try again."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(form);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={signupMutation.isLoading}
          className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition"
        >
          {signupMutation.isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </Modal>
  );
};

export default SignUp;
