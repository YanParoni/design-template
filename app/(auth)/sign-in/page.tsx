"use client";
import React, { useState } from "react";
import Input from "@ui/components/atoms/input";
import { useRouter } from "next/navigation";
import Button from "@ui/components/atoms/button";
import { useLogin } from "@ui/queries/auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateAsync } = useLogin();

  const handleLogin = async () => {
    try {
      await mutateAsync({ username, password });
      router.push('/games')
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRedirect = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:pt-12">
      <div className="relative flex flex-col justify-center w-full h-full sm:w-[495px] sm:max-w-[38.15rem] sm:h-[432px] sm:rounded-lg bg-[#775677] pb-20 pt-12">
        <div className="">
          <h1 className="mb-8 text-center text-xl sm:text-2xl font-bold text-white">
            Sign in to Playboxd
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-5 px-2 sm:px-24">
          <Input
            label="Username"
            variant="primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            variant="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <Button variant="primary" label="Sign In" onClick={handleLogin} />
          </div>
        </div>
        <button
          onClick={handleRedirect}
          className={`absolute bottom-0 h-14 w-full rounded-b-lg bg-[#775677] px-1 sm:px-24 py-2 text-[11px] font-bold text-comp-description shadow-light transition duration-200 hover:text-accent-theme`}
        >
          Reset your password or retrieve a forgotten username.
        </button>
      </div>
    </div>
  );
};

export default SignIn;
