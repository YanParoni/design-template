import React, { useState } from 'react';
import Link from 'next/link'

interface InputProps {
  label: string;
  variant: 'primary' | 'secondary';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  forgottenLabel?: boolean; 
}

const Input: React.FC<InputProps> = ({ label, variant, type = 'text', onChange, forgottenLabel }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `w-full text-black font-montserrat text-1rem h-[1.6rem] leading-[1.0625rem] p-[0.3125rem_0.4375rem] h-[31px] rounded-[2px]`;

  const primaryStyles = 'bg-light-purple text-description border-b-[1px] border-[#574766]';
  const secondaryStyles = 'bg-[#d7c2ea] text-description border-b-[1px] border-[#574766]';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full">
      <div className='w-full flex justify-between '>
      <label className="text-description text-[12px] mb-1">{label}</label>
      {type === 'password' && forgottenLabel && (
          <Link className=" text-accent-theme hover:text-white text-[12px] font-semibold" href='/forgot'>Forgotten?</Link>
      )}
      </div>
      <input
        type={type}
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
