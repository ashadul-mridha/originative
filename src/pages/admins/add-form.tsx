import AdminForm from "@/components/AdminManagement/AdminForm";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Admin Form</title>
      </Head>
      <AdminForm />
    </>
  );
}

export default index;
