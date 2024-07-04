import React from 'react';

interface SplitButtonProps {
  onMainClick: () => void;
  onSecondaryClick: () => void;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  onMainClick,
  onSecondaryClick,
}) => {
  return (
    <div className="relative inline-flex">
      <button
        onClick={onMainClick}
        className="font-montserrat min-w-[57px] min-h-[27px] rounded-[3px] px-3 shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] border-t-[2px] border-t-[#f481f2] bg-accent-theme hover:bg-accent-theme-comp text-white font-semibold  text-[13px]  tracking-wider flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="ml-1">LOG</span>
        </button>
    </div>
  );
};

export default SplitButton;
