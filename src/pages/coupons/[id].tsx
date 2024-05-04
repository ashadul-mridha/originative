import CouponDetails from "@/components/CouponManagement/CouponDetails";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Splash Details</title>
      </Head>
      <CouponDetails />
    </>
  );
}

export default index;
