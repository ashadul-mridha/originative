import React from "react";

function Loader() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <img src="https://cdn2.hubspot.net/hub/219329/file-2131270105-png/fuel-10.png" alt="Loader" className="animate-pulse" />
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
