import React from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "client/store";
import UserLockIcon from "@ui/components/atoms/navbar/user-lock-icon";
import { KeyIcon } from "@heroicons/react/24/solid";
import UserProfileImage from "@ui/components/atoms/navbar/user-profile-image";

const MobileContent: React.FC = () => {
  const { activeState, setActiveState, isAuthenticated, logout,user } =
    useAuthStore();

  const handleSignInClick = () => {
    setTimeout(() => setActiveState("login"), 200);
  };

  const handleCreateAccountClick = () => {
    setActiveState("signup");
  };

  const handleCloseModal = () => {
    setActiveState("default");
  };

  

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
      <UserProfileImage
      profileImage={user?.profileImage}/>
      ) : (
        <>
          {activeState === "login" ? (
            <XMarkIcon
              className="h-5 w-5 cursor-pointer text-white"
              onClick={handleCloseModal}
            />
          ) : (
            <>
              <UserLockIcon
                className="h-w-7 w-7 cursor-pointer fill-white"
                onClick={handleSignInClick}
              />
            </>
          )}
          <KeyIcon
            className="h-w-5 w-5 cursor-pointer fill-white"
            onClick={handleCreateAccountClick}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-w-5 w-5 cursor-pointer stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default MobileContent;
