import React, { useState, useRef, useEffect } from "react";
import { ChevronRightIcon } from "@shared/icons";
import { cn } from "../shared/lib";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select Subject",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | null) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative w-full max-w-2xl" onBlur={onBlur}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-2 rounded-full border border-white/20 focus:border-white/50 transition-colors flex items-center justify-between"
      >
        <span
          className={cn(
            "line-clamp-1",
            !selectedOption ? "opacity-90" : "",
            displayText === placeholder ? "text-neutral-500" : ""
          )}
        >
          {displayText}
        </span>
        <ChevronRightIcon
          className={`w-7 h-7 transition-transform rotate-90 ${
            isOpen ? "rotate-[270deg]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bg-neutral-900 z-50 w-full mt-2 border border-white/20 rounded-2xl overflow-hidden">
          <div
            onClick={() => handleSelect(null)}
            className="p-2 text-neutral-500 cursor-pointer transition-colors border-b border-white/20"
          >
            {placeholder}
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`p-2 cursor-pointer transition-colors ${
                value === option.value ? "bg-neutral-800" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
