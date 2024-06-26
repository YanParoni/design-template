import React, { useState, useEffect } from 'react';

interface InputProps {
  label: string;
  variant: 'primary' | 'secondary';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, variant, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `w-full text-black font-montserrat text-1rem h-[1.75rem] leading-[1.0625rem] p-[0.3125rem_0.4375rem] h-[31px]`;

  const primaryStyles = 'bg-light-purple text-description border-b-[1px] border-[#574766]';
  const secondaryStyles = '';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(()=>{
    console.log(isFocused,'focus')
  },[isFocused])
  
  return (
    <div className="w-full">
      <label className="block text-description text-[12px] mb-1">{label}</label>
      <input
        type="text"
        placeholder={''}
        className={`${baseStyles} ${styles}`}
        style={{ backgroundColor: isFocused ? 'white' : '' }}

        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
