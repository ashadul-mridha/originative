import PageHeader from "@/components/Common/PageHeader";
import FuelList from "@/components/FuelManagement/FuelList";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Fuel List</title>
      </Head>
      <div className="px-4">
        <PageHeader title={"Fuel"} text={"Fuel List"} url="/fuels/add-form" />
        <FuelList />
      </div>
    </>
  );
}

export default index;
