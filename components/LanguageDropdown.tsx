import React, { useState } from "react";

interface Props {
  options: string[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
}

const LanguageDropdown = ({
  options,
  selectedValue,
  onSelectionChange,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleOptionSelect = (value: string) => {
    onSelectionChange(value);
    setIsDropdownOpen(false);
  };
  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="py-1 px-3 bg-gray-500 text-white rounded shadow-md hover:bg-red-200 transition duration-300 ease-in-out"
      >
        {selectedValue}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 overflow-hidden border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <div
              className={`block px-4 py-2 text-white cursor-pointer ${
                option === selectedValue
                  ? "bg-gray-500 text-white"
                  : "hover:bg-gray-600 hover:text-white"
              } transition duration-300 ease-in-out`}
              key={index}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
