"use client";
import { createClient } from "@/utils/supabase/client";
import { getUser, logoutUser } from "@/utils/supabase/queries";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function Dash() {
  const [user, setUser] = useState<User | null>(null);
  // for redirect
  const router = useRouter();

  useEffect(() => {
    getUser(supabase).then(setUser).catch(console.error);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(supabase);
      setUser(null);
      router.push("/");
      // Force a re-render to check authentication status
      router.refresh();
    } catch (error) {
      console.log(user);
      console.log("Error logging user out from dashboard.: ", error);
    }
  };
  return (
    <>
      <p>Admin Dashboard</p>
      <p>Admin ID: {user?.id}</p>
      <p>
        Welcome: {user?.user_metadata.first_name}{" "}
        {user?.user_metadata.last_name}
      </p>
      <p>Email: {user?.email}</p>
      <p>
        Account Created:{" "}
        {user?.created_at
          ? new Date(user.created_at).toLocaleDateString()
          : "Date not available"}
      </p>
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
