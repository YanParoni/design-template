import React from "react";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pill?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  type = "button",
  disabled,
  pill = false,
}) => {
  const baseStyles = `font-montserrat font-semibold   w-full h-full ${pill ? "rounded-full text-xs min-h-[25px] min-w-[40px]" : "rounded-[3px] text-[13px] min-h-[31px] min-w-[57px]"} px-2 shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] `;

  const primaryStyles =
    "border-t-[2px] border-t-primary-border-button bg-accent-theme hover:bg-accent-theme-comp  text-comp-description  px-4 tracking-wider";
  const secondaryStyles =
    "bg-secondary-bkg hover:bg-secondary-comp text-description hover:text-comp-description ";

  const disabledStyles =
    "bg-disabled-bkg cursor-not-allowed text-gray-400	 border-t-[2px] border-t-disabled-border hover:bg-disabled-bkg hover:border-t-disabled-border ";
  const styles = disabled
    ? disabledStyles
    : variant === "primary"
      ? primaryStyles
      : secondaryStyles;

  return (
    <button
      type={type}
      className={`${baseStyles} ${styles} `}
      onClick={onClick}
      disabled={disabled}
    >
      {variant === "primary" ? label.toUpperCase() : label}
    </button>
  );
};

export default Button;
