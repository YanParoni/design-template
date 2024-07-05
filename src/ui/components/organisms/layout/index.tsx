import React from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center text-primary-color">
      <div className="w-full max-w-[960px] px-4 pt-7 md:px-0">{children}</div>
    </div>
  );
};

export default LayoutContainer;
