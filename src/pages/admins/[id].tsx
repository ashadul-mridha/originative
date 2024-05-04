import AdminDetails from "@/components/AdminManagement/AdminDetails";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Admin Details</title>
      </Head>
      <AdminDetails />
    </>
  );
}

export default index;
