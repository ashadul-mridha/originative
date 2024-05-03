import PageHeader from "@/components/Common/PageHeader";
import ServiceWorkerList from "@/components/ServiceWorker/ServiceWorkerList";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Service Worker List</title>
      </Head>
      <div className="px-4">
        <PageHeader title={"Service Worker"} text={"Service Worker List"} />
        <ServiceWorkerList />
      </div>
    </>
  );
}

export default index;
