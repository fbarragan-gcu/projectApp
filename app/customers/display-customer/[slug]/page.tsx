"use client";

import { Customer, Project } from "@/app/lib/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HSAccordion } from "preline/preline";

// Display Customer by Id
// customers/display-customer/:id
export default function DisplayCustomer({
  params,
}: {
  params: { slug: string };
}) {
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  // Pull Customer information and Projects Via Slug
  useEffect(() => {
    const fetchCustomerAndProjects = async () => {
      if (params.slug) {
        try {
          // Fetch customer information
          const customerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/customers/${params.slug}`,
            {
              cache: "no-store",
            }
          );
          if (!customerRes.ok) {
            throw new Error(`Failed to fetch customer id: ${params.slug}`);
          }
          const customer = await customerRes.json();
          setCustomerInfo(customer);

          // Fetch projects for the customer
          const projectsRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/projects/customer/${params.slug}`,
            {
              cache: "no-store",
            }
          );
          if (!projectsRes.ok) {
            throw new Error(
              `Failed to fetch projects for customer id: ${params.slug}`
            );
          }
          const allProjects = await projectsRes.json();
          setProjects(allProjects);

          // Set dataFetched to true once both fetch operations are complete
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomerAndProjects();
  }, [params.slug]);

  // Initialize HSAccordion for accordion elements
  useEffect(() => {
    if (dataFetched) {
      const accordionElements =
        document.querySelectorAll<HTMLElement>(".hs-accordion");
      accordionElements.forEach((element) => {
        const accordion = new HSAccordion(element);
        const showBtn = element.querySelector<HTMLElement>(
          ".hs-accordion-toggle"
        );

        showBtn?.addEventListener("click", () => {
          accordion.show();
          // accordion.hide();
        });
      });
    }
  }, [dataFetched]);

  // Display loading while pulling data
  if (loading) return <div>Loading...</div>;
  // Display Customer not found if error with Customer ID
  if (!customerInfo)
    return (
      <div>
        Customer with ID:{params.slug} not found
        <div className="flex justify-center items-center pt-4">
          <Link href="../all-customers" className="text-center text-blue-500">
            Back to all customers
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <h2>Customer ID: {params.slug}</h2>
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2 ...">
          Customer: {customerInfo.first_name} {customerInfo.last_name}
        </div>
        <div className="..">
          Email:{" "}
          <Link
            href={`mailto:${customerInfo.email_address}`}
            className=" text-blue-500"
          >
            {customerInfo.email_address}
          </Link>
        </div>
        <div className="..">
          Phone Number:{" "}
          <Link
            href={`tel:${customerInfo.phone_number}`}
            className=" text-blue-500"
          >
            {customerInfo.phone_number}
          </Link>
        </div>
        <div className="col-span-2 .. pb-4">Projects: {projects.length}</div>
      </div>
      {
        <div className="hs-accordion-group">
          {/* Use index to set id for open/close */}
          {projects.map((project, index) => (
            <div
              className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700"
              id="hs-basic-bordered-collapse-one"
              key={project.project_id}
            >
              <button
                className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
                aria-controls={`hs-basic-bordered-collapse-${index}`}
              >
                <svg
                  className="hs-accordion-active:hidden block size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <svg
                  className="hs-accordion-active:block hidden size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
                {project.scope_of_work}
              </button>
              <div
                id="hs-basic-bordered-collapse-one"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby={`hs-bordered-heading-${index}`}
              >
                <div className="pb-4 px-5">
                  <p className="text-gray-800 dark:text-neutral-200">
                    {project.special_request}
                  </p>
                  <br />
                  {/* Btn to show current Project */}
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Link
                      href={`../../projects/display-project/${project.project_id}`}
                    >
                      Go To Project
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }

      <div className="flex justify-center items-center pt-4">
        <Link href="../all-customers" className="text-center text-blue-500">
          Back to all customers
        </Link>
      </div>
    </>
  );
}
