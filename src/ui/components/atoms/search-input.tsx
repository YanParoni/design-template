import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const SearchInput: React.FC<InputProps> = ({ onChange, onClick }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick(e as any);
    }
  };

  return (
    <div className="relative w-full max-w-[140px]">
      <input
        type="text"
        placeholder="Search here..."
        className="w-full border-b-2 border-b-[#574964] text-description font-montserrat bg-light-purple text-1rem leading-[1.0625rem] px-2 rounded-full h-[24px] pl-4 pr-8"
        style={{ backgroundColor: isFocused ? 'white' : '' }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <MagnifyingGlassIcon onClick={onClick} className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-description" />
    </div>
  );
};

export default SearchInput;
