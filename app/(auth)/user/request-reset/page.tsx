"use client";
import React, { useState } from "react";
import axios from "axios";
import Input from "@ui/components/atoms/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/reset-password-request", {
        email,
      });
      alert("Password reset link sent!");
    } catch (error) {
      console.error("Error requesting password reset", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-[495px] max-w-[38.15rem] rounded-lg bg-[#775677]">
        <div className="p-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Reset password
          </h1>
          <p className="mb-6 text-center text-gray-300">
            Enter your email below, and we'll send you a message with your
            username and a link to reset your password.
          </p>
          <div className="mb-11">
            <Input
              label="Email Address"
              variant="primary"
              onChange={() => {}}
            />
          </div>
        </div>
        <button className="absolute bottom-0 left-0 right-0 h-[50px] w-full rounded-b-lg bg-accent-theme py-2 text-[14px] font-bold text-comp-description shadow-light transition duration-200">
          SEND REQUEST
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
