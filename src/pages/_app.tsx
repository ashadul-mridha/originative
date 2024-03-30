import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <link className="rounded-full" rel="icon" href="/assets/favicon.png" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
