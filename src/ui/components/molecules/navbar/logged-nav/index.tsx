import React from 'react';
import UserDropdown from '../user-dropdown';
import Link from 'next/link';
import { useAuthStore } from 'client/store';
import SplitButton from '@ui/components/atoms/split-button';

export default function LoggedNavbar() {
  const { activeState } = useAuthStore();

  return (
    <>
      {activeState === 'logged' && (
        <div className="flex space-x-2 items-center">
          <UserDropdown />
          <Link
            href=""
            className="font-montserrat font-semibold text-description hover:text-white text-[14px] pr-2"
          >
            GAMES
          </Link>
          <SplitButton onMainClick={() => {}} onSecondaryClick={() => {}} />
        </div>
      )}
    </>
  );
}
