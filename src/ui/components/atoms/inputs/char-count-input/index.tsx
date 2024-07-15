import React, { useState, forwardRef } from "react";

export interface CharacterCountInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  maxLength: number;
  isTextArea?: boolean;
  value: string;
}

const CharacterCountInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CharacterCountInputProps
>(({ label, maxLength, value, isTextArea = false, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `font-md pt-8 pb-2 min-h-[24px] w-full rounded border-b-2 border-b-secondary-border bg-dark-purple px-2 pl-4 pr-8 font-montserrat leading-[1.0625rem] text-description relative`;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="character-count-input relative mb-4">
      {isTextArea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={baseStyles}
          maxLength={maxLength}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          className={baseStyles}
          maxLength={maxLength}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      )}
      <label className="text-md absolute left-4 top-1 block font-medium text-accent-theme">
        {label}
      </label>
      {isFocused && (
        <span className="absolute right-2 top-1 mt-4 text-xs text-gray-300">{`${value.length} / ${maxLength}`}</span>
      )}
    </div>
  );
});

CharacterCountInput.displayName = "CharacterCountInput";
export default CharacterCountInput;
