import React, { useState } from "react";
import OrderList from "./OrderList";
import ProfileDetails from "./ProfileDetails";
import Settings from "./Settings";
import AddressManagement from "./AddressManagement";

function Profile() {
  const [activeTab, setActiveTab] = useState("order_list");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabMenu = [
    { label: "Order List", value: "order_list" },
    { label: "Profile", value: "profile" },
    { label: "Settings", value: "settings" },
    { label: "Address Management", value: "address_management" },
  ];

  return (
    <>
      <div className="w-full  mt-20">
        {/* Tab buttons */}
        <div className="flex gap-x-2 border-b border-gray-500 mb-4">
          {tabMenu.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`py-2 px-4 rounded-lg text-lg font-semibold ${
                activeTab === tab.value
                  ? " text-blue-500 border border-t-blue-500 border-r-blue-500 border-l-blue-500"
                  : ""
              } hover:bg-blue-300`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === "order_list" && <OrderList />}
          {activeTab === "profile" && <ProfileDetails />}
          {activeTab === "settings" && <Settings />}
          {activeTab === "address_management" && <AddressManagement />}
        </div>
      </div>
    </>
  );
}

export default Profile;
