"use client";
import { Project, ProjectFull, Customer } from "@/app/lib/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";

// Display All Project Data
export default function AllProjects() {
  // React State VARS
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  // Set Loading State
  const [loading, setLoading] = useState(true);
  // Set Project Number
  const [numbProjects, setNumbProjects] = useState(null);

  // Get All Customers and Project data via API calls
  // Fetch data on page reload
  useEffect(() => {
    // using NEXT_PUBLIC_API_URL since call is client side
    async function getAllCustomers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/customers/`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Faile to fetch customer data.");
        }

        const data = await res.json();
        setAllCustomers(data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }
    }

    async function getAllProjects() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/projects`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch project data.");
        }

        const data = await res.json();
        setAllProjects(data);
        setNumbProjects(data.length);
      } catch (error) {
        console.log("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    }

    // Fetch all data.
    getAllCustomers();
    getAllProjects();
  }, []);

  const createProfile = (allProjects: Project, allCustomers: Customer) => {
    if (allProjects.customer_id === allCustomers.customer_id) {
      // Combine both to a single object
      return { ...allProjects, ...allCustomers };
    }
    return null;
  };

  const profiles = allProjects.flatMap((project: Project) =>
    allCustomers.map((customer: Customer) => createProfile(project, customer))
  );

  // Remove null values (projects without matching customers)
  const projectInfo = profiles.filter(
    (profile: ProjectFull | null) => profile !== null
  );

  // Display loading while pulling data
  if (loading) return <div>Loading...</div>;
  // Display Project not found if error with Project ID
  if (numbProjects === 0)
    return (
      <div>
        No Projects Yet
        <div className="flex justify-center items-center pt-4">
          <Link href="../projects/new" className="text-center text-blue-500">
            Create a New Project
          </Link>
        </div>
      </div>
    );

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
                          <Link
                            href={`../projects/display-project/${project.project_id}`}
                          >
                            {project.project_id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <Link
                            href={`../customers/display-customer/${project.customer_id}`}
                          >{`${project.first_name} ${project.last_name}`}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {project.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <Link
                            href={`../projects/display-project/${project.project_id}`}
                          >
                            {project.scope_of_work}
                          </Link>
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
