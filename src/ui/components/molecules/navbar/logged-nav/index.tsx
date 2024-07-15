import React from "react";
import UserDropdown from "../../../organisms/navbar/user-dropdown";
import { useNavStore } from "client/store";

export default function LoggedNavbar() {
  const { activeState } = useNavStore();
  return (
    <>
      {activeState === "logged" && (
        <div className="flex items-center space-x-2">
          <UserDropdown />
        </div>
      )}
    </>
  );
}
