"use client";
import React, { useState } from "react";
import Input from "@ui/components/atoms/input";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRequestReset } from "@ui/queries/auth";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phases, setPhases] = useState<"toSubmit" | "submited">("toSubmit");
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
        <div className="flex flex-col items-center gap-8 sm:gap-2 sm:p-2">
          <p className="text-balance max-w-sm px-10 text-center text-xs text-[#e7cbed] sm:text-base">
            Enter your email below, and we'll send you a message with your
            username and a link to reset your password.
          </p>
          <div className="w-2/3 pb-4 pt-2">
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
        <div className="flex flex-col items-center gap-3 sm:gap-5 sm:p-2 sm:px-12">
          <CheckCircleIcon className="h-12 w-12 text-[#e7cbed]" />
          <p className="mb-6 px-6 text-center text-xs text-[#e7cbed] sm:text-base">
            If the provided address belongs to an account, you will receive a
            link to reset your password.
          </p>
        </div>
      );
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center sm:items-center">
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#775677] ${phases === "submited" ? "gap-44" : "gap-3"} sm:h-80 sm:w-[495px] sm:justify-start sm:gap-4 sm:p-6`}
      >
        <div className="flex sm:px-8">
          <h1 className="text-center text-xl font-bold text-white sm:mb-4 sm:text-2xl">
            Reset password
          </h1>
        </div>
        {renderContent(phases)}
        <button
          onClick={phases === "toSubmit" ? handleSubmit : handleRedirect}
          className={`absolute bottom-0 mt-2 h-11 w-full rounded-b-lg py-2 text-xs font-bold text-comp-description shadow-light transition duration-200 sm:h-14 sm:text-[16px] ${phases === "toSubmit" ? "bg-accent-theme hover:bg-accent-theme-comp sm:border-t-[2px] sm:border-t-[#f481f2]" : "bg-[#775677] hover:bg-[#4a3354]"}`}
        >
          {phases === "toSubmit" ? "SEND REQUEST" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
