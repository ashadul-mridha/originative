import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  title?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  minDate?: Date | number;
  onChange: (date: Date) => void;
  value: Date | string;
  className?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  title,
  required = false,
  placeholder,
  minDate = new Date(),
  onChange,
  value,
  className,
}) => {
  return (
    <div className={`${className ? `${className}` : "mb-6"}`}>
      {title && (
        <label className="block text-gray-700 text-sm font-semibold mb-4">
          {title}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        selected={value instanceof Date ? value : null}
        onChange={(date: Date) => {
          onChange(date);
        }}
        dateFormat="MMMM d, yyyy"
        minDate={minDate instanceof Date ? minDate : null}
        placeholderText={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default DatePickerInput;
