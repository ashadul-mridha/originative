import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

interface SelectInputProps {
  placeholder: string;
  name: string;
  title: string;
  endpoint?: string;
  mapOptions: (data: any) => { value: string; label: string }[];
  isMulti?: boolean;
  noOptionsMessage?: string;
  initialOptions?: { value: string; label: string }[];
  onChange: any;
  required: boolean;
  disabled?: boolean;
  value?: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  endpoint,
  name,
  title,
  mapOptions,
  isMulti = false,
  noOptionsMessage,
  initialOptions,
  onChange,
  required,
  disabled,
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    if (inputValue) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}=${inputValue}`)
        .then((response) => {
          const newOptions: any = mapOptions(response.data.data);
          setOptions(newOptions);
          setIsLoading(false);
          callback(newOptions);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error loading options:", error);
        });
    } else {
      setOptions([]);
      setIsLoading(false);
      callback([]);
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        isLoading={isLoading}
        isClearable
        isSearchable
        placeholder={placeholder}
        required={required}
        value={selectedOption}
        isDisabled={disabled}
        onChange={(value: any) => {
          setSelectedOption(value);
          onChange(value);
        }}
        onInputChange={(inputValue: string) =>
          loadOptions(inputValue, (newOptions) => {})
        }
        options={initialOptions ? initialOptions : options}
        isMulti={isMulti}
        noOptionsMessage={() => noOptionsMessage || "No options found"}
      />
    </div>
  );
};

export default SelectInput;
