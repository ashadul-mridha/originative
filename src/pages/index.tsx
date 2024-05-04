import { Inter } from "next/font/google";
import Head from "next/head";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const router = useRouter();
  // let token: string | null = "" || null;
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
  //   if (!token) {
  //     router.push("/signin");
  //     setLoading(false);
  //   }
  // }, [token]);

  return (
    <>
      <Head>
        <title>Dashboard - FuelDash</title>
      </Head>
      <div
        className={`flex min-h-screen items-center justify-center text-3xl font-semibold ${inter.className}`}
      >
        FuelDash Admin
      </div>
    </>
  );
}
