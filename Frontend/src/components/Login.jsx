import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Modal from "./Modal";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_APP_URL;
const Login = ({ isOpen, onClose, setToken }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loginMutation = useMutation({
    mutationFn: (user) =>
      axios.post(`${API_URL}/}/login`, user, { withCredentials: true }),
    onSuccess: (res) => {
      alert("Login successful!");
      setForm({ email: "", password: "" });
      Cookies.set("token", res.data.token, { expires: 1 });
      setToken(res.data.token); // ✅ Update Navbar state
      onClose();
    },
    onError: (err) =>
      alert(err.response?.data?.message || "Login failed. Try again."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          disabled={loginMutation.isLoading}
          className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600 transition"
        >
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </Modal>
  );
};

export default Login;
