import "./styles.css";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAuthStore, useModalStore } from "client/store";
import UserProfileImage from "@ui/components/atoms/navbar/user-profile-image";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, handlePasswordModal } = useModalStore();
  const { isAuthenticated, setActiveState, logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    setActiveState("default");
    localStorage.removeItem("token");
  };

  const truncateUsername = (username:string) => {
    return username.length > 10 ? username.substring(0, 10) + "..." : username;
  };

  return (
    <>
      {isAuthenticated && (
        <div
          className="dropdown"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className={`${isOpen ? "dropdown-open" : ""}`}>
            <div
              className={`dropdown-button ${
                isOpen ? "dropdown-button-open" : "dropdown-button-closed"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full border-[.02rem] border-bkg-accent ">
                  <UserProfileImage profileImage={user?.profileImage} />
                </div>
                {user && (
                  <h1 className="font-montserrat text-[14px] font-semibold text-description">
                    {truncateUsername(user.username)}
                  </h1>
                )}
                <ChevronDownIcon className="-mr-1 h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            {isOpen && (
              <div className="dropdown-list">
                <div
                  className={`dropdown-button ${
                    isOpen ? "dropdown-button-open" : "dropdown-button-closed"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full border-[.02rem] border-white ">
                      <UserProfileImage profileImage={user?.profileImage} />
                    </div>
                    {user && (
                      <h1 className="font-montserrat text-[14px] font-semibold text-white">
                        {truncateUsername(user.username)}
                      </h1>
                    )}
                    <ChevronDownIcon
                      className="-mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div
                  key={"Profile Button"}
                  className={`dropdown-item`}
                  onClick={openModal}
                >
                  Profile
                </div>
                <div
                  key={"Credentials Button"}
                  className={`dropdown-item`}
                  onClick={() => handlePasswordModal(true)}
                >
                  Credentials
                </div>
                <div
                  key={"Signout Button"}
                  className={`dropdown-item`}
                  onClick={handleLogout}
                >
                  Sign out
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
