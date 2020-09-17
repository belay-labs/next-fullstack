import { concat, filter, map } from "lodash";
import { GetServerSideProps } from "next";
import { Session } from "next-auth/client";
import { useState } from "react";

import Button from "../components/Button";
import privateRoute from "../lib/auth/privateRoute";

interface ServerProps {
  initialPosts?: Array<any>;
}

interface Props {
  session: Session;
}

const Crud = ({ initialPosts, session }: ServerProps & Props) => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState(initialPosts || []);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(-1);

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(target.value);
  };

  const handleCreate = async () => {
    setCreateLoading(true);

    const response = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    });

    const json = await response.json();

    if (response.status === 200) {
      setPosts(concat([json], posts));
    } else {
      // handle error
    }
    setCreateLoading(false);
    setValue("");
  };

  const handleDelete = async (id: number) => {
    setDeleteLoadingId(id);

    await fetch(`/api/post/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setPosts(filter(posts, (post: any) => post.id != id));

    setDeleteLoadingId(-1);
  };

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
          {map(posts, (post: any) => {
            const { createdBy, id, text } = post;

            const imgUrl = createdBy ? createdBy.imgUrl : session.user.image;
            const name = createdBy ? createdBy.name : session.user.name;

            return (
              <div key={id} className="px-6 py-4">
                <div className="pb-2 font-medium text-gray-900">{text}</div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center">
                    <img
                      className="w-6 h-6 object-cover mr-2 rounded-full"
                      src={imgUrl}
                    />
                    {name}
                  </div>
                  <Button
                    className="bg-white text-gray-800 border border-gray-500"
                    hoverClassName="hover:text-red-700"
                    iconPath={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    }
                    loading={deleteLoadingId === id}
                    onClick={() => handleDelete(id)}
                    text="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({
  req,
}: Parameters<GetServerSideProps>[0]): Promise<{ props: ServerProps }> {
  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("cookie", req.headers.cookie || "");

    const response = await fetch(`${process.env.API_URL}/api/post`, {
      method: "GET",
      headers,
    });

    const json = await response.json();

    if (response.status === 200) {
      return { props: { initialPosts: json.posts } };
    } else {
      // handle error
      return { props: {} };
    }
  } catch (e) {
    // handle error
    console.error(e);
    return { props: {} };
  }
}

export default privateRoute(Crud);
