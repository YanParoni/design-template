import React from "react";
import UserDropdown from "../../../organisms/navbar/user-dropdown";
import { useAuthStore } from "client/store";
import SplitButton from "@ui/components/atoms/split-button";

export default function LoggedNavbar() {
  const { activeState, setActiveState } = useAuthStore();
  return (
    <>
      {activeState === "logged" && (
        <div className="flex items-center space-x-2">
          <UserDropdown />
          <SplitButton
            onMainClick={() => setActiveState("default")}
            onSecondaryClick={() => {}}
          />
        </div>
      )}
    </>
  );
}
