import { ReactNode, useState } from "react";
// import { useDispatch } from "react-redux";
import Footer from "../Common/Footer";
import Sidebar from "../Common/Sidebar";
// import { handleResource } from "@/utils/APIRequester";
// import { userSliceData } from "../../../app/feature/userSlice";
import Header from "../Common/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // const getProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await handleResource({
  //       method: "get",
  //       endpoint: "auth/validate-token",
  //       popupMessage: false,
  //     });

  //     if (result) {
  //       dispatch(
  //         userSliceData({
  //           id: result._id,
  //           // first_name: result.first_name,
  //           // last_name: result.last_name,
  //           email: result.email,
  //           // phone: result.phone,
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

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    // <>
    //   <div className="flex flex-auto min-h-screen">
    //     <Sidebar />
    //     <div className="flex-grow overflow-x-auto">
    //       <Header setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
    //       <div className="m-5">{children}</div>
    //       <footer className="text-end p-5 text-gray-600 text-sm italic">
    //         <Footer />
    //       </footer>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="flex">
        <div className="w-2/12 bg-[#dbdeee] min-h-screen">
          <div className="fixed inset-y-0 left-0 w-2/12 h-full overflow-y-auto custom-scrollbar">
            <Sidebar />
          </div>
        </div>

        <div className="w-10/12">
          <header>
            <Header setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
          </header>

          <main className="">{children}</main>

          <footer className="text-end p-5 text-gray-600 text-sm italic">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
