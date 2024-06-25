import * as React from 'react';

const ShadowEffect: React.FunctionComponent = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 opacity-20 hover:opacity-0 transition-opacity duration-300 ease-in-out z-20"></div>
    );
};

export default ShadowEffect;
