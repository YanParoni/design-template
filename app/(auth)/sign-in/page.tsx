"use client";
import React, { useState } from "react";
import Input from "@ui/components/atoms/inputs/input";
import { useRouter } from "next/navigation";
import Button from "@ui/components/atoms/buttons/button";
import { useLogin } from "@ui/queries/auth";
import GoogleButton from "@ui/components/atoms/buttons/google-button";
import { useAuthStore } from "client/store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateAsync } = useLogin();
  const { setAuth } = useAuthStore();
  const handleLogin = async () => {
    try {
      await mutateAsync({ email, password });
      router.push("/games");
      setAuth(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRedirect = () => {
    router.push("/sign-in");
  };
  
  const handleGoogleLogin = () => {
    const authWindow = window.open(
      "http://localhost:3000/auth/google",
      "_blank",
      "width=500,height=600",
    );

    const authInterval = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(authInterval);
        const token = localStorage.getItem("token");
        if (token) {
          router.push("/games");
          setAuth(true);
        }
      }
    }, 1000);
  };
  return (
    <div className="flex h-full w-full items-center justify-center sm:pt-12">
      <div className="bg-auth-bkg relative flex h-full w-full flex-col justify-center pb-20 pt-12 sm:h-[450px] sm:w-[495px] sm:max-w-[38.15rem] sm:rounded-lg">
        <div className="">
          <div
          className="flex justify-center pb-2"
          >
        <img src='/alt-playboxd.svg'/>
        </div>
          <h1 className="mb-6  text-center text-xl font-bold text-white sm:text-2xl">
            Sign in to Playboxd
          </h1>
        </div>
        <div className="flex flex-col justify-center gap-5 px-2 sm:px-24">
          <Input
            label="Username"
            variant="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            variant="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <Button variant="primary" label="Sign In" onClick={handleLogin} />
          <p className="text-center text-description">----- or ----- </p>
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
        <button
          onClick={handleRedirect}
          className={`bg-auth-bkg absolute bottom-0 h-14 w-full rounded-b-lg px-1 py-2 text-[11px] font-bold text-comp-description shadow-light transition duration-200 hover:text-accent-theme sm:px-24`}
        >
          Reset your password or retrieve a forgotten username.
        </button>
      </div>
    </div>
  );
};

export default SignIn;
