"use client";
import { createClient } from "@/utils/supabase/client";
import { getUser, logoutUser } from "@/utils/supabase/queries";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

export default function Dash() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(supabase).then(setUser).catch(console.error);
  });

  const handleLogout = async () => {
    try {
      await logoutUser(supabase);
      setUser(null);
    } catch (error) {
      console.log("Error logging user out from dashboard.");
    }
  };
  return (
    <>
      <p>Admin Dashboard</p>
      <p>Welcome: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
