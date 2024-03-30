import BoatList from "@/components/BoatManagement/BoatList";
import PageHeader from "@/components/Common/PageHeader";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Boats List</title>
      </Head>
      <div className="px-4">
        <PageHeader title={"Boats"} text={"Boats List"} url="/boats/add-form" />
        <BoatList />
      </div>
    </>
  );
}

export default index;
