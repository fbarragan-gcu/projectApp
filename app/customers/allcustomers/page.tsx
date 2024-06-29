import Link from "next/link";
import { Customer } from "@/app/lib/definitions";

// Get All Customer data via API call
async function getAllCustomers() {
  // Call getAllCustomers Via API fetch call
  const res = await fetch(`${process.env.API_URL}/api/customers`, {
    cache: "no-store",
  });
  // TODO: Test if revalidation is better every min
  // const res = await fetch("http://localhost:3000/api/customers", {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function AllCustomers() {
  // Fetch data on page reload
  const allCustomers = await getAllCustomers();

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
                    ></th>
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
                        <Link href={"displaycustomer/" + customer.customer_id}>
                          {customer.customer_id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        <Link href={"displaycustomer/" + customer.customer_id}>
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
