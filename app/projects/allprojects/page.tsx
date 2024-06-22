import { getAllProjects, getAllCustomers } from "@/app/lib/data";
import { Project, Customer } from "@/app/lib/definitions";
import Link from "next/link";

export default async function AllProjects() {
  const allProjects = await getAllProjects();
  const allCustomers = await getAllCustomers();

  const createProfile = (allProjects: Project, allCustomers: Customer) => {
    if (allProjects.customer_id === allCustomers.customer_id) {
      // Combine both to a single object
      return { ...allProjects, ...allCustomers };
    }
    return null;
  };

  const profiles = allProjects.flatMap((project) =>
    allCustomers.map((customer) => createProfile(project, customer))
  );

  // Remove null values (projects without matching customers)
  const projectInfo = profiles.filter((profile) => profile !== null);

  console.log(allProjects);
  console.log(projectInfo);
  return (
    <>
      <p>All Projects</p>

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
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Scope of Work
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {projectInfo.map((project) =>
                    // Remove null values if any
                    project ? (
                      <tr
                        className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                        key={project.project_id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          <Link href={`/DisplayProject/${project.project_id}`}>
                            {project.project_id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <Link
                            href={`../customers/displaycustomer/${project.customer_id}`}
                          >{`${project.first_name} ${project.last_name}`}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {project.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          {project.scope_of_work}
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
