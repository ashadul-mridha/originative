// import axios from "axios";
// import React, { useState } from "react";

// type SelectProp = {
//   options: any[];
//   placeholder?: string;
//   endpoint: string;
//   onChange: (v: string) => void;
//   name: string;
//   title: string;
//   required: boolean;
//   disabled?: boolean;
//   value?: any;
//   isMulti?: boolean;
// };

// const MySelectComponent = ({
//   // options,
//   endpoint,
//   title,
//   ...props
// }: SelectProp & React.SelectHTMLAttributes<HTMLSelectElement>) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [options, setOptions] = useState([]);

//   const loadOptions = (
//     inputValue: string,
//     callback: (options: any[]) => void
//   ) => {
//     if (inputValue) {
//       setIsLoading(true);
//       axios
//         .get(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}=${inputValue}`)
//         .then((response) => {
//           const newOptions: any = response.data.data;
//           setOptions(newOptions);
//           setIsLoading(false);
//           callback(newOptions);
//         });
//     } else {
//       setOptions([]);
//       setIsLoading(false);
//       callback([]);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-gray-700 text-sm font-semibold mb-4">
//         {title}
//         {props.required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         className="w-full h-full border rounded-sm p-2 py-[10px]"
//         {...props}
//         onChange={(e) => props.onChange && props.onChange(e.target.value)}
//       >
//         <option value="">Select {title}</option>

//         {options.map((item) => (
//           <option value={item} key={item}>
//             {item}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default MySelectComponent;



import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // Fetch search results based on the input value (searchValue)
    const fetchData = async () => {
      try {
        // axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/airport/search?name=h=${inputValue}`)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}airport/search?name=${searchValue}`);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchValue.trim() !== "") {
      fetchData();
    } else {
      // If the search input is empty, clear the results
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleInputChange = (e:any) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Enter your search query..."
        />
      </label>

      <ul>
        {searchResults?.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
