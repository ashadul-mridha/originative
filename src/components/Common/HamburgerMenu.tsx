import React from "react";
import style from "./Hamburger.module.css";

interface HamburgerMenuProps {
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function HamburgerMenu({ mobileMenu, setMobileMenu }: HamburgerMenuProps) {
  return (
    <button
      onClick={() => setMobileMenu(!mobileMenu)}
      className={`${mobileMenu && "open"} block ${
        style.hamburger
      } sm:hidden focus:outline-none`}
    >
      <span className={`${style.hamburgerTop}`}></span>
      <span className={`${style.hamburgerMiddle}`}></span>
      <span className={`${style.hamburgerBottom}`}></span>
    </button>
  );
}

export default HamburgerMenu;
