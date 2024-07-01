"use client";
import { AppStats } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

// Application landing page
export default function HomePage() {
  // React State VARS
  const [appStats, setAppStats] = useState<AppStats>();
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
        setAppStats(data[0]);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    getAppStats();
  }, []);

  // Function to format currency to USD
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>
      <h1>Main Page</h1>
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
