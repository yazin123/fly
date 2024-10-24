// src/components/RegistrationForm.js
'use client'
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function RegistrationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate phone number format
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone.replace(/[-()\s]/g, ''))) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      // Check if user exists
      const checkResponse = await fetch(
        `/api/registration?email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`
      );
      const { exists } = await checkResponse.json();
      
      if (exists) {
        setError('This email or phone number has already been registered.');
        return;
      }

      onSuccess(formData);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Conference Registration</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              minLength={2}
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Phone Number (10 digits)"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              pattern="\d{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}