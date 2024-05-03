import AdminList from "@/components/AdminManagement/AdminList";
import PageHeader from "@/components/Common/PageHeader";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Admin List</title>
      </Head>
      <div className="px-4">
        <PageHeader
          title={"Admin"}
          text={"Admin List"}
          url="/admins/add-form"
        />
        <AdminList />
      </div>
    </>
  );
}

export default index;
