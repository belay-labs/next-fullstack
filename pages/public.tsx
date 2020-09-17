import { useSession } from "next-auth/client";

const Public = () => {
  const [session, loading] = useSession();

  return (
    <div className="rounded shadow-lg bg-white px-6 py-4">
      <p>
        You are <strong>{session ? "signed in" : "not signed in"}</strong>.
      </p>
      <hr className="my-4" />
      <p>
        This is a public page. Users can view this page when they are not signed
        in.
      </p>
    </div>
  );
};

export default Public;
