import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

import Header from "../components/Header";

import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
