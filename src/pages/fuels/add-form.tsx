import FuelForm from "@/components/FuelManagement/FuelForm";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Fuel Form</title>
      </Head>
      <FuelForm />
    </>
  );
}

export default index;
