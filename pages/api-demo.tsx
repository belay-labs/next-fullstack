import { useSession } from "next-auth/client";

const ApiDemo = () => {
  const [session, loading] = useSession();

  return (
    <>
      <div className="rounded shadow-lg bg-white px-6 py-4 mb-2">
        <p>
          You are <strong>{session ? "signed in" : "not signed in"}</strong>.
        </p>
      </div>
      <div className="rounded shadow-lg bg-white px-6 py-4 mb-2">
        <div className="mb-2">Public API endpoint</div>
        <iframe
          className="h-12 border border-gray-300 rounded w-full"
          src="/api/public"
        />
      </div>
      <div className="rounded shadow-lg bg-white px-6 py-4">
        <div className="mb-2">
          Private API endpoint (sign in to see response)
        </div>
        <iframe
          className="h-12 border border-gray-300 rounded w-full"
          src="/api/private"
        />
      </div>
    </>
  );
};

export default ApiDemo;
