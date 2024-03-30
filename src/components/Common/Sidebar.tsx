import { CiShop } from "react-icons/ci";
import { TbShoppingCartSearch } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import React, { useEffect, useState } from "react";
// import logo from "../../../public/assets/logo.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import HamburgerMenu from "./HamburgerMenu";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { handleResource } from "@/utils/APIRequester";
// import { resetCartUpdated } from "../../../app/feature/cartSlice";
import Image from "next/image";
import Header from "./Header";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { TiInfoLargeOutline } from "react-icons/ti";
import { IoBoatOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { GiWaterSplash } from "react-icons/gi";
import { VscSymbolEnum } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbPasswordUser } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { FaFill } from "react-icons/fa";
import { MdMultipleStop } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { BsChatLeftDots } from "react-icons/bs";
import { MdOutlineNotificationImportant } from "react-icons/md";

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  // const dispatch = useDispatch();

  // const [cartCount, setCartCount] = useState(0);
  // const userId = useSelector((state: RootState) => state.userData.id);
  // const cart = useSelector((state: RootState) => state.cart.cartUpdated);

  // const getCartList = async () => {
  //   try {
  //     const res = await handleResource({
  //       method: "get",
  //       endpoint: `cart?page=1&limit=50&user_id=${userId}`,
  //       isMultipart: false,
  //     });
  //     setCartCount(res.pagination.total);
  //     dispatch(resetCartUpdated());
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   if (userId || cart) {
  //     getCartList();
  //   }
  // }, [userId, cart]);

  const Menus = [
    {
      title: "Dashboard",
      path: "/",
      src: <MdOutlineDashboard />,
    },
    {
      title: "Enums",
      path: "/enums",
      src: <VscSymbolEnum />,
    },
    {
      title: "Splash",
      path: "/splash",
      src: <GiWaterSplash />,
    },
    {
      title: "Users",
      path: "/users",
      src: <HiOutlineUsers />,
    },
    {
      title: "OTP",
      path: "/otp",
      src: <TbPasswordUser />,
    },
    {
      title: "Fuels",
      path: "/fuels",
      src: <BsFuelPump />,
    },
    {
      title: "Boats",
      path: "/boats",
      src: <IoBoatOutline />,
    },
    {
      title: "Refueling Boats",
      path: "/refueling-boats",
      src: <FaFill />,
    },
    {
      title: "Tipping",
      path: "/tipping",
      src: <MdMultipleStop />,
    },
    {
      title: "Coupons",
      path: "/coupons",
      src: <RiCoupon3Line />,
    },
    {
      title: "Chats",
      path: "/chats",
      src: <BsChatLeftDots />,
    },
    {
      title: "Notification",
      path: "/notification",
      src: <MdOutlineNotificationImportant />,
    },
    {
      title: "Customer Support",
      path: "/customer-support",
      src: <MdOutlineSupportAgent />,
    },
    {
      title: "Service Workers",
      path: "/service-worker",
      src: <GrUserWorker />,
    },
    {
      title: "Service Worker Withdrawal",
      path: "/service-worker-withdrawal",
      src: <IoBoatOutline />,
    },
    {
      title: "Admins",
      path: "/admins",
      src: <GrUserAdmin />,
    },
  ];

  return (
    <>
      <div
        className={`hidden sm:block relative min-h-screen duration-300  text-black bg-[#dbdeee] font-bold px-8`}
      >
        <Link href="/">
          <div className="p-4">
            <div className={`flex items-center justify-center`}>
              {/* <Image
                src={logo}
                alt="logo"
                width={70}
                height={50}
                className="mx-auto my-auto rounded-full"
              /> */}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-xl font-medium whitespace-nowrap ">
                FUELDASH
              </span>
            </div>
          </div>
        </Link>
        <hr className="border-t-2 border-gray-400 my-4" />

        <>
          {Menus.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <p
                className={`flex items-center gap-x-3 px-6 py-3 text-base font-semibold rounded-lg cursor-pointer  hover:bg-[#ced4fc] hover:text-[#0372DE]
                        ${
                          router.pathname === menu.path &&
                          "bg-[#ced4fc] text-[#0372DE]"
                        }`}
              >
                <span className="text-2xl">{menu.src}</span>
                <span className={` origin-left duration-300 hover:block`}>
                  {menu.title}
                </span>
              </p>
            </Link>
          ))}
        </>

        {/* <div className="mt-32">
          <Header setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
        </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerMenu setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6  bg-[#ced4fc] drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <div className="flex items-center gap-x-3">
                {" "}
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={` ${
                    router.pathname === menu.path &&
                    "bg-[#ced4fc] text-[#0372DE]"
                  } p-2 rounded-xl hover:[#ced4fc]`}
                >
                  {menu.title}
                </span>
              </div>
            </Link>
          ))}
          {/* <div className="pt-12 mt-12">
            <Header setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
