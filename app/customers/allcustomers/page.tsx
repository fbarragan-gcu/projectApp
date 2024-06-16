import { fetchAllCustomers } from "@/app/lib/data";

export default async function AllCustomers() {
  const allCustomers = await fetchAllCustomers();
  console.log(allCustomers);
  return (
    <>
      <p>All Customers</p>
      {/* TailwindCSS table with map */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allCustomers.map((customer) => (
              <tr key={customer.customer_id}>
                <th>{customer.customer_id}</th>
                <td>
                  {customer.first_name} {customer.last_name}
                </td>
                <td>{customer.phone_number}</td>
                <td>{customer.email_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
