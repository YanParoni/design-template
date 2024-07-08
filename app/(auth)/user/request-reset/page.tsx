"use client";
import React, { useState } from "react";
import Input from "@ui/components/atoms/input";
import Button from "@ui/components/atoms/button";
import ErrorMessage from "@ui/components/atoms/error-message";
import { useRequestReset } from "@ui/queries/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import forgotPasswordSchema from "@ui/validators/forgot-password-schema";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  const { mutateAsync: requestReset } = useRequestReset();
  const [phases, setPhases] = useState<"toSubmit" | "submitted">("submitted");
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await requestReset(data);
      setPhases("submitted");
      reset();
    } catch (error) {
      console.error("Error requesting password reset", error);
    }
  };

  const handleRedirect = () => {
    router.push("/sign-in");
  };

  const renderContent = (state: "toSubmit" | "submitted") => {
    if (state === "toSubmit") {
      return (
        <>
          <p className="text-balance xs:text-xs px-2 text-center text-sm text-[#e7cbed] sm:text-base">
            Enter your email below, and we'll send you a message with your
            username and a link to reset your password.
          </p>
          <div className="relative w-full px-4 pt-2 sm:w-2/3">
            <Input
              label="Email Address"
              variant="primary"
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage message={errors.email.message as string} />
            )}
          </div>
        </>
      );
    } else if (state === "submitted") {
      return (
        <>
          <CheckCircleIcon className="h-12 w-12 justify-self-center text-[#e7cbed]" />
          <p className="text-balance xs:text-xs px-6 text-center text-sm text-[#e7cbed] sm:text-base">
            If the provided address belongs to an account, you will receive a
            link to reset your password.
          </p>
        </>
      );
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:items-center">
      <div
        className={`grid h-full grid-rows-[1fr_auto] gap-0 rounded-lg bg-[#5a4466] sm:h-80 sm:w-[432px] ${phases === "submitted" ? "gap-20" : "gap-3"}`}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-2 sm:p-2">
          <h1 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
            Reset password
          </h1>
          {renderContent(phases)}
        </div>
        <div className="h-10">
          <Button
            label={phases === "toSubmit" ? "Send Request" : "Sign In"}
            variant="primary"
            type="button"
            onClick={
              phases === "toSubmit" ? handleSubmit(onSubmit) : handleRedirect
            }
            disabled={phases === "toSubmit" && !isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
