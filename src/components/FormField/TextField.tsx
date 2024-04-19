import React from "react";

interface TextFieldProps {
  placeholder: string;
  required: boolean;
  name: string;
  title: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  required,
  name,
  title,
  onChange,
  value,
  disabled,
  type,
}) => {
  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 px-3 py-2 w-full rounded"
      />
    </div>
  );
};

export default TextField;
