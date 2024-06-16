import { fetchAllProjects, fetchAllCustomers } from "@/app/lib/data";
import { Project, Customer } from "@/app/lib/definitions";
import Link from "next/link";

export default async function AllProjects() {
  const allProjects = await fetchAllProjects();
  const allCustomers = await fetchAllCustomers();

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
      {/* TailwindCSS table with map */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Location</th>
              <th>Scope of Work</th>
            </tr>
          </thead>
          <tbody>
            {projectInfo.map((project) =>
              // Remove null values if any
              project ? (
                <tr key={project.project_id}>
                  <th scope="row">
                    <Link href={`/DisplayProject/${project.project_id}`}>
                      {project.project_id}
                    </Link>
                  </th>
                  <td>
                    <Link href={`/DisplayCustomer/${project.customer_id}`}>
                      {`${project.first_name} ${project.last_name}`}
                    </Link>
                  </td>
                  <td>{project.city}</td>
                  <td>{project.scope_of_work}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
