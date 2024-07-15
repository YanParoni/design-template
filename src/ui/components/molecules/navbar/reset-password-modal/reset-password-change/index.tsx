import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@ui/components/atoms/modal";
import Button from "@ui/components/atoms/buttons/button";
import Input from "@ui/components/atoms/inputs/input";
import { useModalStore, useAlertStore } from "client/store";
import { useChangePassword } from "@ui/queries/auth";
import ErrorMessage from "@ui/components/atoms/error-message";

const passwordChangeSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required")
    .matches(/^\S*$/, "Password must not contain spaces"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPasswordChange: React.FC = () => {
  const { handlePasswordModal, passwordModal } = useModalStore();
  const { showAlert } = useAlertStore();
  const { mutateAsync } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      showAlert("Password changed successfully!", "success");
      handlePasswordModal(false);
    } catch (error) {
      showAlert("Failed to change password", "error");
    }
  };

  return (
    <Modal
      title="Change Password"
      isVisible={passwordModal}
      onClose={() => handlePasswordModal(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <Input
            variant="primary"
            label="Current Password"
            type="password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <ErrorMessage message={errors.currentPassword.message as string} />
          )}
        </div>
        <div className="relative mb-4">
          <Input
            variant="primary"
            label="New Password"
            type="password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <ErrorMessage message={errors.newPassword.message as string} />
          )}
        </div>
        <div className="relative mb-4">
          <Input
            variant="primary"
            label="Confirm New Password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message as string} />
          )}
        </div>
        <Button type="submit" label="Save" variant="primary" />
      </form>
    </Modal>
  );
};

export default ResetPasswordChange;
