import React from "react";
import { useAuthStore } from "client/store";
import ResetPasswordSetup from "./reset-password-setup";
import ResetPasswordChange from "./reset-password-change";

const ResetPasswordModal: React.FC = () => {
  const { user } = useAuthStore();

  return user?.needsPasswordSetup ? (
    <ResetPasswordSetup />
  ) : (
    <ResetPasswordChange />
  );
};

export default ResetPasswordModal;
