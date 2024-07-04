import Link from "next/link";
import NavLinks from "./Navlinks";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";

interface Props {
  companyName: string;
}

// NavBar using NavLinks to controll logged-on or Logged-off state.
export default async function NavBar({ companyName }: Props) {
  // Create Supabase Instance
  const supabase = createClient();
  // Check for logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      {/* <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800 sticky top-0"> */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm  text-white py-4 dark:bg-neutral-800 sticky top-0">
        <NavLinks companyName={companyName} user={user} />
      </header>
      {/* DarkMode Toggle */}
      {/* TODO: FIX */}
      {/* <button
        type="button"
        className="hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-white hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="dark"
      >
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </button>
      <button
        type="button"
        className="hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-white hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="light"
      >
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button> */}
    </>
  );
}
