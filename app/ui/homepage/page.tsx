"use client";
import { AppStats } from "@/app/lib/definitions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Application landing page
// export default function HomePage({ user }: Props) {
export default function HomePage() {
  // React State VARS
  const [appStats, setAppStats] = useState<AppStats>();
  const [isLoggedIn, setIsLoggedIn] = useState<User | null | undefined>(null);
  const router = useRouter();
  const pathname = usePathname();
  // Get All Customer data via API call
  // Fetch data on page reload
  useEffect(() => {
    // using NEXT_PUBLIC_API_URL since client side
    async function getAppStats() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admins/stats`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setAppStats(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    async function checkUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(user);
    }

    checkUser();
    getAppStats();
  }, [pathname]);

  // Function to format currency to USD
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>
      {isLoggedIn ? <p>Hello {isLoggedIn.user_metadata.first_name}</p> : null}
      <h1>Summary Data</h1>
      <p>Number of Customers: {appStats?.number_of_customers}</p>
      <p>Number of Projects: {appStats?.number_of_projects}</p>
      <p>
        Total Quoted Price:{" "}
        {appStats?.project_total !== undefined
          ? formatCurrency(appStats.project_total)
          : "N/A"}
      </p>
      <p>Number of Admins: {appStats?.number_of_admins}</p>
    </>
  );
}
