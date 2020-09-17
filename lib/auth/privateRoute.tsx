import { signIn, useSession } from "next-auth/client";
import Router from "next/router";
import React from "react";

import Loader from "../../components/Loader";

const privateRoute = (WrappedComponent: any) => (props: any) => {
  const [session, loading] = useSession();

  if (!loading && !session) signIn();

  if (session) {
    return <WrappedComponent {...props} session={session} />;
  } else {
    return <Loader />;
  }
};

export default privateRoute;
