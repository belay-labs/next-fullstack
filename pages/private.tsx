import privateRoute from "../lib/auth/privateRoute";

const Private = () => {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="rounded shadow-lg bg-white px-6 py-4">
        <div>This is a private page.</div>
      </div>
    </div>
  );
};

export default privateRoute(Private);
