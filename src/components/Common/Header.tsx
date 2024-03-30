import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { FaUserCheck } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface MenuProps {
  mobileMenu?: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setMobileMenu }: MenuProps) {
  const router = useRouter();
  // const name = useSelector((state: RootState) => state.userData.name);
  // const phone = useSelector((state: RootState) => state.userData.phone);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      label: "Profile",
      link: "/profile",
      icon: <RiUserSettingsFill />,
    },
    {
      label: "Signout",
      link: "signout",
      icon: <FaSignOutAlt />,
    },
  ];

  const handleOptionClick = (option: any) => {
    if (option === "signout") {
      Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
      router.push("/signin");
    } else {
      router.push(option);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center relative w-full">
        <div
          ref={dropdownRef}
          className="relative inline-block w-full text-end"
        >
          <>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-end items-center gap-x-2 w-full px-4 py-2 font-lg text-black hover:text-[#0372DE] text-lg border-b-2 border-t-2 border-gray-400 p-3"
            >
              <FaUserCheck />
              {/* <span className="text-black hover:text-[#0372DE] flex items-center">
                {name || phone}{" "}
                <span className="ms-3">
                  {!isOpen ? <FaChevronDown /> : <FaChevronUp />}
                </span>
              </span> */}
            </button>
          </>

          {isOpen && (
            <div className="absolute top-full divide-y divide-gray-100 rounded-md -lg w-full shadow-md">
              <div className="py-1">
                {options.map((option) => (
                  <button
                    key={option.link}
                    onClick={() => {
                      handleOptionClick(option.link);
                      setMobileMenu(false);
                    }}
                    className="flex items-center px-4 py-2 leading-5 bg-[#dbdeee] hover:bg-[#ced4fc] hover:text-[#0372DE] font-semibold w-full text-left"
                  >
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
