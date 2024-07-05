import * as React from "react";

interface IChatTitleProps {
  children: React.ReactNode;
}

const ChatHeader = ({ children }: IChatTitleProps) => {
  return (
    <div className="justify-items absolute z-50 flex max-h-20 w-full justify-items-end rounded-md border-b border-solid border-purple-500 bg-bkg-chat py-2 shadow shadow-bkg md:grid md:grid-cols-1">
      {children}
    </div>
  );
};

export default ChatHeader;
