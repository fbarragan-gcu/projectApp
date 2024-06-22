import { getAllAdmins } from "@/app/lib/data";

export default async function AllAdmins() {
  const allAdmins = await getAllAdmins();
  console.log(allAdmins);
  return (
    <>
      <h2>All Admins</h2>
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
                      ID
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
                      Username
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
                  {allAdmins.map((admin) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                      key={admin.admin_id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        {admin.admin_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {admin.first_name} {admin.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {admin.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        {admin.email}
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
