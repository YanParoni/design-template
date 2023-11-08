import * as React from 'react';

export interface IChatLayoutProps {
    children: React.ReactNode
}

export function ChatLayout ({children}: IChatLayoutProps) {
  return (
    <div className="flex flex-col bg-bkg-chat h-screen md:h-full z-60  w-72 md:w-80 overflow-y-auto rounded-t-md ">
    {children}
    </div>
  );
}
