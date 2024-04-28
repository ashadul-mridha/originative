import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  // return (
  //   <>
  //     <Head>
  //       <link className="rounded-full" rel="icon" href="/assets/favicon.png" />
  //     </Head>

  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </>
  // );

  let token: string | null = "" || null;

  useEffect(() => {
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
    if (!token) {
      router.push("/signin");
    }
  }, [token]);

  const pagesWithoutLayout = ["/signin"];

  const shouldRenderWithoutLayout = pagesWithoutLayout.some((route) =>
    router.pathname.startsWith(route)
  );

  return shouldRenderWithoutLayout ? (
    <>
      <Head>
        <link className="rounded-full" rel="icon" href="/assets/favicon.png" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  ) : (
    <>
      <Head>
        <link className="rounded-full" rel="icon" href="/assets/favicon.png" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
