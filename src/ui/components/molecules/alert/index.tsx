import React, { useEffect } from "react";
import { useAlertStore } from "client/store";

const Alert: React.FC = () => {
  const { message, type, isVisible, hideAlert } = useAlertStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideAlert]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed left-4 top-4 z-[100] rounded-lg p-4 shadow-lg ${type === "success" ? "border-green-600 bg-green-200 text-green-600" : "border-red-600 bg-red-200 text-red-600"}`}
    >
      <p className="font-bold">{type === "success" ? "Success" : "Error"}</p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
