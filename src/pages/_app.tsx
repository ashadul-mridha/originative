import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import Hero from "../components/Originative";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const tokenFromCookie = Cookies.get(
  //     `${process.env.NEXT_PUBLIC_TOKEN_NAME}`
  //   );
  //   if (!tokenFromCookie) {
  //     router.push("/signin");
  //   } else {
  //     setToken(tokenFromCookie);
  //     setLoading(false);
  //   }
  // }, [router, token]);

  const pagesWithoutLayout = ["/signin"];

  const shouldRenderWithoutLayout = pagesWithoutLayout.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <>
      <Hero />
    </>
    //   shouldRenderWithoutLayout && (
    //     <>
    //       <Head>
    //         <link rel="icon" href="/assets/favicon.png" />
    //       </Head>
    //       <Provider store={store}>
    //         <Component {...pageProps} />
    //       </Provider>
    //     </>
    //   )
    // );
    // ) : (
    //   <>
    //     <Head>
    //       <link rel="icon" href="/assets/favicon.png" />
    //     </Head>
    //     {loading ? (
    //       <div>
    //         <Loader />
    //       </div>
    //     ) : (
    //       // <Provider store={store}>
    //       <Layout>
    //         <Component {...pageProps} />
    //       </Layout>
    //       // </Provider>
    //     )}
    //   </>
    // );
  );
}

export default MyApp;
