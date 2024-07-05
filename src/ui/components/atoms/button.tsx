import React from "react";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick }) => {
  const baseStyles =
    "font-montserrat  min-w-[57px] min-h-[31px] rounded-[3px] px-2 shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)]";

  const primaryStyles =
    "border-t-[2px] border-t-[#f481f2] bg-accent-theme hover:bg-accent-theme-comp text-comp-description font-semibold text-[#e3eae0] text-[13px] px-4 tracking-wider	";
  const secondaryStyles =
    "bg-secondary-bkg hover:bg-secondary-comp text-description hover:text-comp-description text-[12px]";

  const styles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button className={`${baseStyles} ${styles}`} onClick={onClick}>
      {variant === "primary" ? label.toUpperCase() : label}
    </button>
  );
};

export default Button;
