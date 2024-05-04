import PageHeader from "@/components/Common/PageHeader";
import CouponList from "@/components/CouponManagement/CouponList";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Coupon List</title>
      </Head>
      <div className="px-4">
        <PageHeader
          title={"Coupon"}
          text={"Coupon List"}
          url="/coupons/add-form"
        />
        <CouponList />
      </div>
    </>
  );
}

export default index;
