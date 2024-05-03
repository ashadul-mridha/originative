import CouponForm from "@/components/CouponManagement/CouponForm";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Coupon Form</title>
      </Head>
      <CouponForm />
    </>
  );
}

export default index;
