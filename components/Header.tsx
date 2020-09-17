import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  session: any;
}

interface ButtonProps {
  active?: boolean;
  onClick?: () => void;
  text: string;
}

const HeaderButton = ({ active, onClick, text }: ButtonProps) => {
  return (
    <button
      className={`${
        active && "text-yellow-600"
      } text-sm font-semibold text-gray-600 focus:outline-none hover:text-yellow-700`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Header = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <div className="px-4 py-2 flex justify-between">
      <div className="flex items-center">
        <Link href="/">
          <a className="flex items-center flex-shrink-0 text-gray-800 mr-6 hover:text-yellow-700">
            <svg
              className="mr-2"
              fill="none"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <span className="font-semibold text-xl tracking-tight">Demo</span>
          </a>
        </Link>
        <Link href="/public">
          <a className="ml-6">
            <HeaderButton
              text="Public"
              active={router.pathname === "/public"}
            />
          </a>
        </Link>
        <Link href="/private">
          <a className="ml-4">
            <HeaderButton
              text="Private"
              active={router.pathname === "/private"}
            />
          </a>
        </Link>
        <Link href="/api-demo">
          <a className="ml-4">
            <HeaderButton text="API" active={router.pathname === "/api-demo"} />
          </a>
        </Link>
        <Link href="/crud">
          <a className="ml-4">
            <HeaderButton text="CRUD" active={router.pathname === "/crud"} />
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <img className="w-8 mr-2 rounded-full" src={session.user?.image} />
            <HeaderButton onClick={signOut} text="Sign out" />
          </>
        ) : (
          <>
            <HeaderButton onClick={signIn} text="Sign in" />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
