import { Session } from "next-auth/client";
import { useState } from "react";

import Button from "../components/Button";
import privateRoute from "../lib/auth/privateRoute";

interface Props {
  session: Session;
}

const Crud = ({ session }: Props) => {
  const [value, setValue] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(target.value);
  };

  const handleCreate = () => {};

  return (
    <>
      <div className="rounded shadow-lg bg-white px-6 py-4 mb-2">
        <p>
          You are <strong>{session ? "signed in" : "not signed in"}</strong>.
        </p>
        <hr className="my-4" />
        <p>
          This boilerplate includes{" "}
          <a
            className="text-yellow-600 hover:text-yellow-700"
            href="https://sequelize.org/"
            target="_blank"
          >
            Sequelize
          </a>{" "}
          which is a Node.js ORM for Postgres, MySQL, MariaDB, SQLite and
          Microsoft SQL Server. This demo is connected to a Postgres instance.
        </p>
      </div>
      <div className="rounded shadow-lg bg-white">
        <div className="px-6 py-6">
          <textarea
            className="bg-white focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
            onChange={handleChange}
            placeholder="Create a new post!"
            rows={3}
            value={value}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-600">
              You can delete your post afterwards.
            </div>
            <Button
              disabled={!value}
              iconPath={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              }
              loading={createLoading}
              onClick={handleCreate}
              text="Create"
            />
          </div>
        </div>
        <hr />
        <div className="divide-gray-300 divide-y-2">
          <div className="px-6 py-4">
            <div className="pb-2 font-medium text-gray-900">ARGGG</div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 ">MEEP MOOP</div>
              HOLLAAAA
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="pb-2 font-medium text-gray-900">ARGGG</div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 ">MEEP MOOP</div>
              HOLLAAAA
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default privateRoute(Crud);
