import "./styles.css";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "client/store";
import UserProfileImage from "@ui/components/atoms/navbar/user-profile-image";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setActiveState, logout, user, token } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setActiveState("default");
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
              <div className="flex items-center space-x-2">
                <div className="rounded-full border-[.02rem] border-[#7d6589] bg-[#4b3756] px-[2px] py-[2px]">
                  <UserProfileImage profileImage={user?.profileImage} />
                </div>
                {user && (
                  <h1 className="font-montserrat text-[14px] font-semibold text-description">
                    {user.username}
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
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-[.01rem] border-[#7d6589] bg-[#4b3756] px-[2px] py-[2px]">
                      <UserProfileImage profileImage={user?.profileImage} />
                    </div>
                    {user && (
                      <h1 className="font-montserrat text-[14px] font-semibold text-white">
                        {user.username}
                      </h1>
                    )}
                    <ChevronDownIcon
                      className="-mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div key={"hello"} className={`dropdown-item`}>
                  Profile
                </div>
                <div
                  key={"hello2"}
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
