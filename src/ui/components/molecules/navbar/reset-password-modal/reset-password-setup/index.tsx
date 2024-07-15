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

const passwordSetupSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(/^\S*$/, "Password must not contain spaces"),
});

type PasswordSetupFormData = yup.InferType<typeof passwordSetupSchema>;

const ResetPasswordSetup: React.FC = () => {
  const { handlePasswordModal, passwordModal } = useModalStore();
  const { showAlert } = useAlertStore();
  const { mutateAsync } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSetupFormData>({
    resolver: yupResolver(passwordSetupSchema),
  });

  const onSubmit = async (data: PasswordSetupFormData) => {
    try {
      await mutateAsync(data);
      showAlert("Password set successfully!", "success");
      handlePasswordModal(false);
    } catch (error) {
      showAlert("Failed to set password", "error");
    }
  };
  const closeModal = () => {
    handlePasswordModal(false);
  };

  return (
    <Modal title="Set Password" isVisible={passwordModal} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
        <Button type="submit" label="Save" variant="primary" />
      </form>
    </Modal>
  );
};

export default ResetPasswordSetup;
