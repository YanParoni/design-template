'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/send-test-email');
      alert('Password reset link sent!');
    } catch (error) {
      console.error('Error requesting password reset', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Request Reset</button>
    </form>
  );
};

export default ForgotPassword;
