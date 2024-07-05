"use client";
import React, { useState } from "react";
import Input from "@ui/components/atoms/input";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRequestReset } from "@ui/queries/auth";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phases, setPhases] = useState<"toSubmit" | "submited">("submited");
  const router = useRouter();
  const { mutateAsync: requestReset } = useRequestReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestReset({ email });
      setPhases("submited");
      alert("Password reset link sent!");
    } catch (error) {
      console.error("Error requesting password reset", error);
    }
  };

  const handleRedirect = () => {
    router.push("/sign-in");
  };

  const renderContent = (state: "toSubmit" | "submited") => {
    if (state === "toSubmit") {
      return (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-[#e7cbed]">
            Enter your email below, and we'll send you a message with your
            username and a link to reset your password.
          </p>
          <div className="mb-4 w-2/3 ">
            <Input
              label="Email Address"
              variant="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (state === "submited") {
      return (
        <div className="flex flex-col items-center gap-4 px-12">
        <CheckCircleIcon
        className='h-12 w-12 text-[#e7cbed]'
        />
        <p className="mb-6 text-center text-[#e7cbed] ">
        If the provided address belongs to an account, you will receive a link to reset your password.
        </p>
        </div>
      );
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-[495px] max-w-[38.15rem] h-80 rounded-lg bg-[#775677]">
        <div className="p-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Reset password
          </h1>
        </div>
        {renderContent(phases)}
        <button 
          onClick={phases === "toSubmit" ? handleSubmit : handleRedirect}
          className={`absolute mt-2 bottom-0 h-14 w-full rounded-b-lg  py-2 text-[16px] font-bold text-comp-description shadow-light transition duration-200 
          ${ phases === 'toSubmit' ? 'bg-accent-theme hover:bg-accent-theme-comp': 'bg-[#775677] hover:bg-[#4a3354]'}`}
        >
          {phases === 'toSubmit'?'SEND REQUEST':'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
