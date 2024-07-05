import * as React from "react";

const ShadowEffect: React.FunctionComponent = () => {
  return (
    <div className="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 opacity-20 transition-opacity duration-300 ease-in-out hover:opacity-0"></div>
  );
};

export default ShadowEffect;
