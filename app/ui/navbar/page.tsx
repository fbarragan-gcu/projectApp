import NavLinks from "./Navlinks";
import { createClient } from "@/utils/supabase/server";

// NavBar using NavLinks to controll logged-on or Logged-off state.
export default async function NavBar() {
  // Create Supabase Instance
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {/* <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800 sticky top-0"> */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm  text-white py-4 dark:bg-neutral-800 sticky top-0">
        <NavLinks user={user} />
        {/* <NavLinks companyName={companyName} /> */}
      </header>
    </>
  );
}
