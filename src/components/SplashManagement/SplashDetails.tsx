import { handleResource } from "@/utils/APIRequester";
import { Splash } from "@/utils/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import Loader from "../Common/Loader";
import { IoArrowBack } from "react-icons/io5";

function SplashDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [splash, setSplash] = useState<Splash>({
    _id: "",
    is_active: false,
    created_by: null,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    title: "",
    type: "",
    description: "",
    logo: "",
    images: "",
  });
  const [routerId, setRouterId] = useState<string | string[]>("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setRouterId(router.query.id);
    }
  }, [router.query.id]);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await handleResource({
        method: "get",
        endpoint: `splash/${routerId}`,
      });
      setSplash(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routerId) {
      getData();
    }
  }, [routerId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-4 mt-4">
        <div>
          {" "}
          <div className="flex justify-between">
            <div className="text-xl text-lack font-bold flex items-center gap-4 px-4">
              Splash Details
            </div>

            <div>
              <button
                className="px-6 py-2 border-2 border-gray-500 text-black font-semibold rounded flex items-center gap-3"
                onClick={() =>
                  router.push(`/splash/add-form?editId=${splash._id}`)
                }
              >
                <CiEdit /> Edit Splash
              </button>
            </div>
          </div>
          <hr className="border-gray-500 my-3 border-1" />
          {/* <> */}
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 p-3">
            <div className="font-bold ">
              Title: <b className="font-normal">{splash?.title}</b>
            </div>
            <div className="font-bold ">
              Type: <b className="font-normal">{splash?.type}</b>
            </div>
            <div className="font-bold ">
              Status:{" "}
              <b className="font-normal">
                {splash?.is_active ? "Active" : "Inactive"}
              </b>
            </div>
            <div className="font-bold">
              Created By: <b className="font-normal">{splash.created_by}</b>
            </div>

            <div className="font-bold ">
              Created At:{" "}
              <b className="font-normal">
                {" "}
                {new Date(splash?.created_at).toLocaleDateString()}
              </b>
            </div>
            <div className="font-bold ">
              Updated At:{" "}
              <b className="font-normal">
                {new Date(splash?.updated_at).toLocaleDateString()}
              </b>
            </div>

            <div className="font-bold ">
              Image:{" "}
              <b className="font-normal text-blue-600">
                <span>
                  <a href={splash.images} target="_blank">
                    Image
                  </a>
                </span>
              </b>
            </div>

            <div className="font-bold ">
              Logo:{" "}
              <b className="font-normal text-blue-600">
                <span>
                  <a href={splash.logo} target="_blank">
                    Logo
                  </a>
                </span>
              </b>
            </div>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-3">
            <div className="font-bold ">
              Description: <b className="font-normal">{splash?.description}</b>
            </div>
          </div>
          <div className="flex justify-between my-3">
            <button
              className="border border-gray-300 px-8 py-2 font-semibold text-black mx-1 rounded-full hover:border hover:border-black"
              onClick={() => {
                router.push("/splash");
              }}
            >
              <span
                role="img"
                aria-label="Back"
                className="flex items-center gap-x-3"
              >
                <IoArrowBack /> Back
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashDetails;
