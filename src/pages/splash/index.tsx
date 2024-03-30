import PageHeader from "@/components/Common/PageHeader";
import SplashList from "@/components/SplashManagement/SplashList";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Splash List</title>
      </Head>
      <div className="px-4">
        <PageHeader
          title={"Splash"}
          text={"Splash List"}
          url="/splash/add-form"
        />
        <SplashList />
      </div>
    </>
  );
}

export default index;
