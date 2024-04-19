import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

interface SelectInputProps {
  placeholder: string;
  name: string;
  title: string;
  endpoint?: string;
  mapOptions: (data: any) => { value: string | number; label: string }[];
  isMulti?: boolean;
  noOptionsMessage?: string;
  initialOptions: { value: string | number; label: string }[];
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
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (value) {
      // Find the selected option based on the value
      const selected = initialOptions.find((option) => option.value === value);
      setSelectedOption(selected || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, initialOptions]);

  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    if (inputValue) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}=${inputValue}`)
        .then((response) => {
          const newOptions: any = mapOptions(response.data);
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
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
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
        onChange={(selected: any) => {
          setSelectedOption(selected);
          onChange(selected ? selected.value : "");
        }}
        onInputChange={(inputValue: string) =>
          loadOptions(inputValue, (newOptions) => {})
        }
        options={initialOptions || options}
        isMulti={isMulti}
        noOptionsMessage={() => noOptionsMessage || "No options found"}
        className="pb-2"
        getOptionLabel={(option: any) => option.label}
      />
    </div>
  );
};

export default SelectInput;
