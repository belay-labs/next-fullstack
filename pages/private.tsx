import { Session } from "next-auth/client";

import privateRoute from "../lib/auth/privateRoute";

interface Props {
  session: Session;
}

const Private = ({ session }: Props) => {
  return (
    <div className="rounded shadow-lg bg-white px-6 py-4">
      <p>
        You are <strong>{session ? "signed in" : "not signed in"}</strong>.
      </p>
      <hr className="my-4" />
      <p>
        This is a private page. Only users who are signed in can view this page.
      </p>
    </div>
  );
};

export default privateRoute(Private);
