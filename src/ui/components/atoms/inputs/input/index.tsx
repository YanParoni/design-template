import React, { useState, forwardRef } from "react";
import Link from "next/link";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant: "primary" | "secondary";
  forgottenLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant, type = "text", forgottenLabel, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = `w-full text-black font-montserrat text-1rem h-[1.6rem] leading-[1.0625rem] p-[0.3125rem_0.4375rem] h-[31px] rounded-[3px]`;

    const primaryStyles =
      "bg-dark-purple text-description border-b-[2px] border-secondary-border";
    const secondaryStyles =
      "bg-light-purple text-description border-b-[2px] border-secondary-border";

    const styles = variant === "primary" ? primaryStyles : secondaryStyles;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className="w-full">
        <div className="flex w-full justify-between">
          <label className="mb-1 text-[12px] text-label">{label}</label>
          {type === "password" && forgottenLabel && (
            <Link
              className="text-[12px] font-semibold text-accent-theme hover:text-white"
              href="/user/request-reset"
            >
              Forgotten?
            </Link>
          )}
        </div>
        <input
          type={type}
          ref={ref}
          placeholder=""
          className={`${baseStyles} ${styles}`}
          style={{ backgroundColor: isFocused ? "white" : "" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
