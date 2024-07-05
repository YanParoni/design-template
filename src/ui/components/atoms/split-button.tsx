import React from "react";

interface SplitButtonProps {
  onMainClick: () => void;
  onSecondaryClick: () => void;
}

const SplitButton: React.FC<SplitButtonProps> = ({ onMainClick }) => {
  return (
    <div className="relative inline-flex">
      <button
        onClick={onMainClick}
        className="flex min-h-[27px] min-w-[57px] items-center rounded-[3px] border-t-[2px] border-t-[#f481f2] bg-accent-theme px-3 font-montserrat text-[13px] font-semibold tracking-wider text-white shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] hover:bg-accent-theme-comp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="h-4 w-4"
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
