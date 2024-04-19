import React from "react";

function Loader() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <img src="./assets/logo.jpg" alt="Loader" className="animate-pulse" />
        {/* <Image
          src={logo}
          alt="logo"
          width={70}
          height={50}
          className="animate-pulse"
        /> */}
      </div>
    </>
  );
}

export default Loader;
