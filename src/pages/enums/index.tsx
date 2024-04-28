import PageHeader from "@/components/Common/PageHeader";
import EnumList from "@/components/EnumManagement/EnumList";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Enum List</title>
      </Head>
      <div className="px-4">
        <PageHeader
          titleTwo={"Delivery Address Enum"}
          urlTwo="/enums/add-address-enum"
          text={"Enum List"}
          title={"Boat Enum"}
          url="/enums/add-boat-enum"
        />
        <EnumList />
      </div>
    </>
  );
}

export default index;
