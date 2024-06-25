import './styles.css';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface DropdownProps {
  label: string;
  options: { label: string; value: any }[];
  onSelect: (value: string) => void;
  selectedValue: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  const showValue =
    selectedValue !== null
      ? options.find((item) => item.value === selectedValue)?.label
      : label;

  return (
    <div
      className={'dropdown'}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`${isOpen ? 'dropdown-open' : ''}`}>
        <div
          className={`dropdown-button ${
            isOpen ? 'dropdown-button-open' : 'dropdown-button-closed'
          }`}
        >
          <p className="font-montserrat font-medium text-[11px] z-1">
            {showValue?.toUpperCase()}
          </p>
          <ChevronDownIcon className="w-4 h-4 -mr-1" aria-hidden="true" />
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            <div
              className={`dropdown-button ${
                isOpen ? 'dropdown-button-open' : 'dropdown-button-closed'
              }`}
            >
              <p className="font-montserrat font-medium text-[11px]">{showValue?.toUpperCase()}</p>
              <ChevronDownIcon className="w-4 h-4 -mr-1" aria-hidden="true" />
            </div>
            {options.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`dropdown-item ${
                  selectedValue === option.value ? 'dropdown-item-selected' : ''
                } ${index === 0 ? 'dropdown-item-border' : ''}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
