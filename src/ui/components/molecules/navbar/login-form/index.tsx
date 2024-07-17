import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@ui/components/atoms/buttons/button";
import Input from "@ui/components/atoms/inputs/input";
import GoogleButton from "@ui/components/atoms/buttons/google-button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLogin } from "@ui/queries/auth";
import { useAuthStore, useNavStore, useAlertStore } from "client/store";
interface LoginFormProps {
  onCloseClick: () => void;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? process.env.NEXT_PUBLIC_API
    : "http://localhost:3000";

const LoginForm: React.FC<LoginFormProps> = ({ onCloseClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync } = useLogin();
  const { activeState, setActiveState } = useNavStore();
  const { showAlert } = useAlertStore();
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    const response = await mutateAsync({ email, password });
    if (response.error) {
      showAlert("Failed to log in", "error");
    } else {
      showAlert("Logged in successfully!", "success");
      setActiveState("logged");
      setAuth(true);
    }
  };

  const handleGoogleLogin = () => {
    const authWindow = window.open(
      `${BASE_URL}/auth/google`,
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          <XMarkIcon
            className="hidden h-5 w-5 cursor-pointer fill-description stroke-description hover:fill-description hover:stroke-white lg:block"
            onClick={onCloseClick}
          />
          <div className="w-screen pr-6 lg:w-[150px] lg:pr-0">
            <Input
              type="email"
              label="Email"
              variant="primary"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-screen pr-6 lg:w-[150px] lg:pr-0">
            <Input
              forgottenLabel
              type="password"
              label="Password"
              variant="primary"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex w-screen flex-row justify-between py-2  lg:w-fit lg:gap-2 lg:py-0">
            <div className="flex flex-col justify-end w-fit">
              <Button label="sign in" variant="primary" onClick={handleLogin} />
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-center text-description">---or---</h1>
            </div>
            <div className='w-fit'>
            <GoogleButton variant='secondary' onClick={handleGoogleLogin} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
