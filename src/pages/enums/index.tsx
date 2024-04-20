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
        <PageHeader title={"Enum"} text={"Enum List"} url="/enums/add-form" />
        <EnumList />
      </div>
    </>
  );
}

export default index;
