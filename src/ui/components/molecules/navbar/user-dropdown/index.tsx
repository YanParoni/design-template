import './styles.css';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from 'client/store';
import { UserIcon } from '@heroicons/react/24/solid';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setActiveState, logout, user } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    logout();
    setActiveState('default');
  };

  return (
    <>
      {isAuthenticated && (
        <div
          className="dropdown"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className={`${isOpen ? 'dropdown-open' : ''}`}>
            <div
              className={`dropdown-button ${
                isOpen ? 'dropdown-button-open' : 'dropdown-button-closed'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className=" bg-[#4b3756] border-[1px] border-[#7d6589] px-[1px] py-[1px] rounded-full">
                  <UserIcon
                    className="w-6 h-6 text-[#7d6589] cursor-pointer"
                    onClick={handleLogout}
                  />
                </div>
                {user && (
                  <h1 className={`font-montserrat font-semibold  text-[14px]`}>
                    {user.username}
                  </h1>
                )}
                <ChevronDownIcon className="w-5 h-5 " aria-hidden="true" />
              </div>
            </div>
            {isOpen && (
              <div className="dropdown-list">
                <div
                  className={`dropdown-button ${
                    isOpen ? 'dropdown-button-open' : 'dropdown-button-closed'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className=" bg-[#4b3756]  border-[1px] border-[#7d6589]  px-[2px] py-[2px] rounded-full">
                      <UserIcon
                        className="w-6 h-6 text-[#7d6589] cursor-pointer"
                        onClick={handleLogout}
                      />
                    </div>
                    {user && (
                      <h1 className="font-montserrat font-semibold text-white text-[14px]">
                        {user.username}
                      </h1>
                    )}
                    <ChevronDownIcon
                      className="w-4 h-4 -mr-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div key={'hello'} className={`dropdown-item`}>
                  Profile
                </div>
                <div key={'hello2'} className={`dropdown-item`} onClick={handleLogout}>
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
