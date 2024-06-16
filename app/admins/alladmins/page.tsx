import { fetchAllAdmins } from "@/app/lib/data";

export default async function AllAdmins() {
  const allAdmins = await fetchAllAdmins();
  console.log(allAdmins);
  return (
    <>
      <p>All Admins</p>
      {/* TailwindCSS table with map */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allAdmins.map((admin) => (
              <tr key={admin.admin_id}>
                <th>{admin.admin_id}</th>
                <td>
                  {admin.first_name} {admin.last_name}
                </td>
                <td>{admin.user_name}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
