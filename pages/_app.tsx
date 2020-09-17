import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

import Header from "../components/Header";

import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Header />
        <div className="container mx-auto max-w-2xl my-4">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
