import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavStore } from "client/store";
import UserLockIcon from "@ui/components/atoms/navbar/user-lock-icon";
import { KeyIcon } from "@heroicons/react/24/solid";
import UserDropdown from "../../../organisms/navbar/user-dropdown";

const MobileContent: React.FC = () => {
  const { activeState, setActiveState,  } = useNavStore();

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
    <div className="flex items-end space-x-4">
      {false ? (
        <UserDropdown />
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
        </>
      )}
    </div>
  );
};

export default MobileContent;
