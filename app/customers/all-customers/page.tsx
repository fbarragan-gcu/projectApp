"use client";
import Link from "next/link";
import { Customer } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

// Page to Display All Customers and Information.
export default function AllCustomers() {
  // React State VARS
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  // Set Loading State
  const [loading, setLoading] = useState(true);
  // Set Customer Length
  const [numbCustomers, setNumbCustomers] = useState(null);

  // Get All Customer data via API call
  // Fetch data on page reload
  useEffect(() => {
    // using NEXT_PUBLIC_API_URL since client side
    async function fetchCustomers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setAllCustomers(data);
        setNumbCustomers(data.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  // Display loading while pulling data
  if (loading) return <div>Loading...</div>;
  // Display Project not found if error with Project ID
  if (numbCustomers === 0)
    return (
      <div>
        No Customers Yet
        <div className="flex justify-center items-center pt-4">
          <Link href="../customers/new" className="text-center text-blue-500">
            Create a New Customer
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <p>All Customers</p>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {/* Map over contents of all customers from getAllCustomers API call */}
                  {allCustomers.map((customer: Customer) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                      key={customer.customer_id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        <Link href={"display-customer/" + customer.customer_id}>
                          {customer.customer_id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <Link href={"display-customer/" + customer.customer_id}>
                          {customer.first_name} {customer.last_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <Link href={`tel:${customer.phone_number}`}>
                          {customer.phone_number}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <Link href={`mailto:${customer.email_address}`}>
                          {customer.email_address}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
