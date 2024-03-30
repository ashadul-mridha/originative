import React, { ChangeEvent, useEffect, useState } from "react";

interface NumberInputProps {
  type: "integer" | "float" | "number";
  placeholder: string;
  value: number | string;
  onChange: (value: number | string) => void;
  name: string;
  title?: string;
  required: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  title,
  required,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let parsedValue: number | string = inputValue;

    if (type === "integer") {
      parsedValue = parseInt(inputValue, 10) || "";
    } else if (type === "float") {
      parsedValue = parseFloat(inputValue) || "";
    }
    onChange(parsedValue);
  };

  return (
    <div className="mb-6">
      {title && (
        <label
          className="block text-gray-700 text-sm font-semibold mb-4"
          htmlFor={name}
        >
          {title}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className="p-2 border border-1 border-[#B3B3B3] w-full rounded"
        type="number"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInput;
