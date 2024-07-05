import React, { useState } from "react";
import Link from "next/link";

interface InputProps {
  label: string;
  variant: "primary" | "secondary";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  forgottenLabel?: boolean;
  value: any
}

const Input: React.FC<InputProps> = ({
  label,
  variant,
  type = "text",
  onChange,
  forgottenLabel,
  value
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `w-full text-black font-montserrat text-1rem h-[1.6rem] leading-[1.0625rem] p-[0.3125rem_0.4375rem] h-[31px] rounded-[3px]`;

  const primaryStyles =
    "bg-light-purple text-description border-b-[2px] border-[#574766]";
  const secondaryStyles =
    "bg-[#d7c2ea] text-description border-b-[2px] border-[#574766]";

  const styles = variant === "primary" ? primaryStyles : secondaryStyles;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <label className="mb-1 text-[12px] text-[#cf9ad6]">{label}</label>
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
        value={value}
        placeholder={""}
        className={`${baseStyles} ${styles}`}
        style={{ backgroundColor: isFocused ? "white" : "" }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
