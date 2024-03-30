import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
