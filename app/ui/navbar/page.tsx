"use client";
import NavLinks from "./Navlinks";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/utils/supabase/queries";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface Props {
  companyName: string;
}

// NavBar using NavLinks to controll logged-on or Logged-off state.
export default function NavBar({ companyName }: Props) {
  // Create Supabase Instance
  const [isLoggedIn, setIsLoggedIn] = useState<User | null | undefined>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsLoggedIn(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Set State to null if error processing login
        setIsLoggedIn(null);
      }
    }

    checkUser();
  }, []);
  return (
    <>
      {/* <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800 sticky top-0"> */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm  text-white py-4 dark:bg-neutral-800 sticky top-0">
        <NavLinks companyName={companyName} user={isLoggedIn} />
      </header>
    </>
  );
}
