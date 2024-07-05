import * as React from "react";

interface ChatContent {
  children: React.ReactNode;
}

const ChatContent = ({ children }: ChatContent) => {
  return (
    <div className="h-80 max-h-80 w-72 flex-grow flex-row p-6 md:flex-col">
      {children}
    </div>
  );
};

export default ChatContent;
