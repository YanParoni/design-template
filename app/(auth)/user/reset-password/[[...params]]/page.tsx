"use client";
import React, { useEffect } from "react";
import Input from "@ui/components/atoms/inputs/input";
import Button from "@ui/components/atoms/button";
import ErrorMessage from "@ui/components/atoms/error-message";
import { useResetPassword, useValidateToken } from "@ui/queries/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import resetPasswordSchema from "@ui/validators/reset-password-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlertStore } from "client/store";
interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  const search = useSearchParams();
  const { mutateAsync: validateToken } = useValidateToken();
  const { mutateAsync: resetPassword } = useResetPassword();
  const { showAlert } = useAlertStore();

  useEffect(() => {
    const tokenFromUrl = search.get("token");
    if (!tokenFromUrl) {
      showAlert("Invalid or expired token", "error");
      return router.push("/games");
    }
    const validate = async () => {
      try {
        const response = await validateToken(tokenFromUrl);
        if (!response.valid) {
          showAlert(response.message, "error");
          router.push("/games");
        }
      } catch (error) {
        console.error("Error validating token", error);
        showAlert("Invalid or expired token", "error");
        router.push("/games");
      }
    };
    validate();
  }, [router, search, validateToken]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const tokenFromUrl = search.get("token");
    try {
      await resetPassword({token: tokenFromUrl!, newPassword: data.newPassword });
      showAlert("Password reset successfully", "success");
      reset();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error resetting password", error);
      showAlert("Failed to reset password", "error");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:items-center">
      <div className="grid h-full w-full grid-rows-[1fr_auto] gap-0 rounded-lg bg-auth-bkg sm:h-80 sm:w-[432px] sm:gap-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-2 sm:p-2">
          <h1 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
            Reset password
          </h1>
          <p className="max-w-sm text-balance px-10 text-center text-xs text-auth-primary sm:text-base">
            Reset the Letterboxd password for
          </p>
          <div className="relative w-full px-4 pt-2 sm:w-2/3">
            <Input
              label="New Password"
              variant="primary"
              {...register("newPassword")}
              type='password'
            />
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword.message as string} />
            )}
          </div>
          <div className="relative w-full px-4 pt-2 sm:w-2/3">
            <Input
              label="Confirm Password"
              variant="primary"
              {...register("confirmPassword")}
              type='password'
            />
            {errors.confirmPassword && (
              <ErrorMessage
                message={errors.confirmPassword.message as string}
              />
            )}
          </div>
        </div>
        <div className="h-10">
          <Button
            label="Reset Password"
            variant="primary"
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
