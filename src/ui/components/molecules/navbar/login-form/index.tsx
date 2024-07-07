// src/components/molecules/login-form.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@ui/components/atoms/button";
import Input from "@ui/components/atoms/input";
import GoogleButton from "@ui/components/atoms/google-button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLogin } from "@ui/queries/auth";
import { useAuthStore } from "client/store";
interface LoginFormProps {
  onCloseClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onCloseClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync } = useLogin();
  const { activeState } = useAuthStore();

  const handleLogin = async () => {
    try {
      const response = await mutateAsync({ username, password });
    } catch (error) {
      console.error("Login failed", error);
    }
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
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {activeState === "login" && (
        <motion.div
          className="flex flex-col items-start space-x-2 space-y-2 px-8 lg:flex-row lg:items-end lg:space-y-0 lg:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <XMarkIcon
            className="hidden h-5 w-5 cursor-pointer fill-description stroke-description hover:fill-description hover:stroke-white lg:block"
            onClick={onCloseClick}
          />
          <div className="w-screen pr-6 lg:w-[150px] lg:pr-0">
            <Input
              label="Username"
              variant="primary"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-screen pr-6 lg:w-[150px] lg:pr-0">
            <Input
              forgottenLabel
              type="password"
              label="Password"
              variant="primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-screen flex-row justify-between py-2 pr-4 lg:w-fit lg:gap-2 lg:py-0">
            <div className="flex flex-col justify-end">
              <Button label="sign in" variant="primary" onClick={handleLogin} />
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-center text-description">---or---</h1>
            </div>
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
