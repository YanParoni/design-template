import React from "react";
import UserDropdown from "../user-dropdown";
import Link from "next/link";
import { useAuthStore } from "client/store";
import SplitButton from "@ui/components/atoms/split-button";

export default function LoggedNavbar() {
  const { activeState } = useAuthStore();

  return (
    <>
      {activeState === "logged" && (
        <div className="flex items-center space-x-2">
          <UserDropdown />
          <Link
            href=""
            className="pr-2 font-montserrat text-[14px] font-semibold text-description hover:text-white"
          >
            GAMES
          </Link>
          <SplitButton onMainClick={() => {}} onSecondaryClick={() => {}} />
        </div>
      )}
    </>
  );
}
