import React from "react";
import ResetPasswordSetup from "./reset-password-setup";
import ResetPasswordChange from "./reset-password-change";
import { useAuthStore } from "client/store";

const ResetPasswordModal: React.FC = () => {
  const { needsSetup } = useAuthStore();

  return (
    <>
      {needsSetup && <ResetPasswordSetup />}
      {!needsSetup && <ResetPasswordChange />}
    </>
  );
};

export default ResetPasswordModal;
