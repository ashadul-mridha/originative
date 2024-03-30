import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Head from "next/head";
import Cookies from "js-cookie";
import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
// import { adminSliceData } from "../../../app/feature/userSlice";
import Loader from "../Common/Loader";
import TextField from "../FormField/TextField";
import { userSliceData } from "../../../app/feature/userSlice";

function Index() {
  const [loading, setLoading] = useState(false);
  let token: string | null = "" || null;

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
    if (token) {
      router.push("/");
    }
    setLoading(false);
  }, [token]);

  const router = useRouter();
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleResource({
        method: "post",
        endpoint: "users/signin",
        data: formData,
        isMultipart: false,
      });
      Cookies.set(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`, result.token, {});
      dispatch(
        userSliceData({
          id: result.results._id,
          name: result.results.name,
          phone: result.results.phone,
        })
      );

      router.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-10 bg-white rounded-lg -lg border border-blue-300">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                placeholder="example@example.com"
                type="phone"
                title="Email"
                required={true}
                name="phone"
                onChange={(value: string) => handleChange("phone", value)}
                value={formData.phone}
              />
            </div>

            <div>
              <TextField
                placeholder="********"
                type="password"
                title="Password"
                required={true}
                name="password"
                onChange={(value: string) => handleChange("password", value)}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className={`${
                loading || (!formData.phone && !formData.password)
                  ? "w-full bg-gray-500 font-semibold text-white p-2 rounded mt-3 flex justify-center items-center"
                  : "w-full bg-blue-500 font-semibold text-white p-2 rounded hover:bg-blue-400 mt-3 flex justify-center items-center"
              }  `}
              disabled={
                loading || (!formData.phone && !formData.password)
                  ? true
                  : false
              }
            >
              SIGN IN
              <span className="text-2xl ml-2 font-bold">
                <IoIosLogIn />
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
