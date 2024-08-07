import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFilterStore } from "client/store";
export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  search: string;
  searchTerm: string;
  setSearch: (value: string) => void;
}


const SearchInput: React.FC<InputProps> = ({ onChange, onClick, search, searchTerm, setSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick(e as any);
    }
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="relative w-full min-w-[140px]">
      <input
        id="Search input"
        type="text"
        placeholder="Search here..."
        className="text-1rem h-[24px] w-full rounded-full border-b-2 border-b-secondary-border bg-dark-purple px-2 pl-4 pr-8 font-montserrat leading-[1.0625rem] text-description focus:border-white"
        style={{ backgroundColor: isFocused ? "white" : "" }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        value={searchTerm}
      />
      {searchTerm === search ? (
        <XMarkIcon
          onClick={handleClearSearch}
          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer text-description"
        />
      ) : (
        <MagnifyingGlassIcon
          onClick={onClick}
          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer text-description"
        />
      )}
    </div>
  );
};

export default SearchInput;