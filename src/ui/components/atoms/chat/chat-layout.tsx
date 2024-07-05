import * as React from "react";

export interface IChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: IChatLayoutProps) {
  return (
    <div className="z-60 flex h-screen w-72 flex-col overflow-y-auto rounded-t-md bg-bkg-chat md:h-full md:w-80">
      {children}
    </div>
  );
}
