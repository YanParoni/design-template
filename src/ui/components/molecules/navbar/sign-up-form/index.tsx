import React from "react";
import Input from "@ui/components/atoms/inputs/input";
import Button from "@ui/components/atoms/buttons/button";
import { useCreateUser } from "@ui/queries/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@ui/validators/signup-schema";
import ErrorMessage from "@ui/components/atoms/error-message";
import { useAlertStore, useAuthStore } from "client/store";
import GoogleButton from "@ui/components/atoms/buttons/google-button";
import { useRouter } from "next/navigation";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  at: string;
}

interface SignUpForm {
  onClose: () => void;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? process.env.NEXT_PUBLIC_API
    : "http://localhost:3000";

const SignUpForm: React.FC<SignUpForm> = ({ onClose }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
  });
  const { setAuth } = useAuthStore();

  const createUser = useCreateUser();
  const { showAlert } = useAlertStore();

  const onSubmit = async (data: SignUpFormValues) => {
    const response = await createUser.mutateAsync(data);
    if (response.error) {
      showAlert(response.error, "error");
      reset();
    } else {
      showAlert("Account created!", "success");
      reset();
      onClose();
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
        const token = localStorage.getItem("token");
        if (token) {
          router.push("/games");
          setAuth(true);
        }
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="relative mb-4 w-[240px]">
        <Input
          variant="secondary"
          {...register("email")}
          label="Email Address"
        />
        {errors?.email && (
          <ErrorMessage message={errors?.email?.message as string} />
        )}
      </div>

      <div className="relative mb-4 w-[140px]">
        <Input variant="secondary" {...register("username")} label="Username" />
        {errors.username && (
          <ErrorMessage message={errors.username.message as string} />
        )}
      </div>

      <div className="relative mb-4 w-[140px]">
        <Input variant="secondary" {...register("at")} label="@" />
        {errors.at && <ErrorMessage message={errors.at.message as string} />}
      </div>
      <div className="relative mb-4 w-[140px]">
        <Input
          variant="secondary"
          {...register("password")}
          label="Password"
          type="password"
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message as string} />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          label="Sign Up"
          variant="primary"
          type="submit"
          disabled={!isValid}
        />
        <p className="text-description text-lg"> ----- or -----</p>
        <div className="w-full">
          <GoogleButton onClick={handleGoogleLogin} variant="secondary" />
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
