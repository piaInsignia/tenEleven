import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };
  return (
    <div className={`relative ${className} flex flex-col space-y-1`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full h-[45px] rounded-md border border-gray-300 bg-[#F6F7FB] px-3 py-2 text-sm text-[#7D7D9D] placeholder-[#7D7D9D]
           focus:outline-none 
          disabled:bg-gray-100 disabled:cursor-not-allowed
            ${
              disabled
                ? "bg-gray-50 text-[#7D7D9D] cursor-not-allowed"
                : "cursor-pointer"
            }
            ${isOpen ? "border-blue-500 ring-2 ring-blue-500" : ""}
          `}
        >
          <span
            className={`block truncate text-left ${
              selectedOption ? "text-[#7D7D9D]" : "text-[#7D7D9D]"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 
                    focus:outline-none transition-colors duration-150 text-sm
                    ${
                      selectedValue === option.value
                        ? "bg-blue-50 text-[#7D7D9D]"
                        : "text-gray-900"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
};

export default Select;
