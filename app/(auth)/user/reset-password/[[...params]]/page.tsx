"use client";
import React, { useState, useEffect } from "react";
import Input from "@ui/components/atoms/input";
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
    mode: "onChange",
  });
  const router = useRouter();
  const search = useSearchParams();
  const [token, setToken] = useState("");
  const { mutateAsync: validateToken } = useValidateToken();
  const { mutateAsync: resetPassword } = useResetPassword();
  const { showAlert } = useAlertStore()
  useEffect(() => {
    const tokenFromUrl = search.get("token");
    if (!tokenFromUrl) {
      showAlert('Invalid or expired token', 'error');
      return router.push("/games");
    }
    setToken(tokenFromUrl);

    const validate = async () => {
      try {
        const response = await validateToken(tokenFromUrl);
        if (!response.valid) {
          showAlert(response.message, 'error');
          router.push("/games");
        }
      } catch (error) {
        console.error("Error validating token", error);
        showAlert('Invalid or expired token', 'error');
        router.push("/games");
      }
    };

    validate();
  }, [router, search, validateToken]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword({ token, newPassword: data.newPassword });
      showAlert('Password reset successfully', 'success');
      reset();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error resetting password", error);
      showAlert('Failed to reset password', 'error');
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:items-center">
      <div
        className="grid h-full w-full grid-rows-[1fr_auto] gap-0 rounded-lg bg-[#5a4466] sm:h-80 sm:w-[432px] sm:gap-4"
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-2 sm:p-2">
          <h1 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
            Reset password
          </h1>
          <p className="text-balance max-w-sm px-10 text-center text-xs text-[#e7cbed] sm:text-base">
            Reset the Letterboxd password for
          </p>
          <div className="relative w-full px-4 pt-2 sm:w-2/3">
            <Input
              label="New Password"
              variant="primary"
              {...register("newPassword")}
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
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message as string} />
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
