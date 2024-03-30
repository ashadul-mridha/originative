import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Sidebar from "../Common/Sidebar";
import Footer from "../Common/Footer";
import Loader from "../Common/Loader";
import { handleResource } from "@/utils/APIRequester";
import { userSliceData } from "../../../app/feature/userSlice";
import Header from "../Common/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const getProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await handleResource({
  //       method: "get",
  //       endpoint: "users/profile",
  //     });
  //     if (result) {
  //       dispatch(
  //         userSliceData({
  //           id: result.user.id,
  //           name: result.user.name,
  //           phone: result.user.phone,
  //         })
  //       );
  //     } else {
  //       router.push("/signin");
  //     }
  //   } catch (error) {
  //     if (error) {
  //       router.push("/signin");
  //     }
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  if (loading) {
    return <Loader />;
  }
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <div className="flex flex-auto min-h-screen">
        <Sidebar />
        <div className="grow">
          <Header setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
          <div className="m-5">{children}</div>
          <footer className="text-end p-5 text-gray-600 text-sm italic">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
