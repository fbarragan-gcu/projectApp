import { getCustomerById, getProjectsByCustomerId } from "@/app/lib/data";
import Link from "next/link";

export default async function DisplayCustomer({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  const customer = await getCustomerById(params.slug);
  const projects = await getProjectsByCustomerId(params.slug);
  console.log(customer);
  console.log(projects);
  return (
    <>
      <h2>Customer Info {params.slug}</h2>
      <h3>
        {customer?.first_name} {customer?.last_name}
      </h3>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2 ...">
          Customer: {customer?.first_name} {customer?.last_name}
        </div>
        <div className="..">Email: {customer?.email_address}</div>
        <div className="..">Phone Number: {customer?.phone_number}</div>
        <div className="col-span-2 .. pb-4">Projects:# {projects?.length}</div>
      </div>

      {/* Project Info */}
      {/* NEW */}
      <div className="hs-accordion-group">
        {projects?.map((projectInfo) => (
          <div
            // className="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700"
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700"
            id="hs-bordered-heading-one"
            key={projectInfo.project_id}
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
              aria-controls={`hs-basic-bordered-collapse-${projectInfo.project_id}`}
            >
              <svg
                className="hs-accordion-active:hidden block size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
              {projectInfo.scope_of_work}
            </button>
            <div
              id="hs-basic-bordered-collapse-one"
              // className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby={`hs-bordered-heading-${projectInfo.project_id}`}
            >
              <div className="pb-4 px-5">
                <p className="text-gray-800 dark:text-neutral-200">
                  {projectInfo.special_request}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Link href="../allcustomers" className="text-center">
          Back to all customers
        </Link>
      </div>
    </>
  );
}
