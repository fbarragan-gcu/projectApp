"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Project, Customer } from "@/app/lib/definitions";
import Modal from "@/app/ui/modal/modal1";
import { HSOverlay } from "preline/preline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// TODO: Fix Modal Popup.

// Edit Project Page
// projects/edit/:id
export default function Edit({ params }: { params: { slug: string } }) {
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [project, setProjects] = useState<Project>();
  const [loading, setLoading] = useState(true);
  // React State VARS for Modal
  const [modalStatus, setModalStatus] = useState({
    title: "",
    status: "",
    css: "",
  });

  // Open/Close Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Open/Close Modal Function
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  // for redirect
  const router = useRouter();

  // Pull Projects by Slug ID
  useEffect(() => {
    if (params.slug) {
      const getProjectAndCustomer = async () => {
        try {
          // Fetch project info first
          const projectRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.slug}`,
            { cache: "no-store" }
          );
          if (!projectRes.ok) {
            throw new Error(`Failed to fetch project by id: ${params.slug}`);
          }
          const project = await projectRes.json();
          setProjects(project);

          // Then fetch customer using project's customer_id
          const customerRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${project.customer_id}`,
            { cache: "no-store" }
          );
          if (!customerRes.ok) {
            throw new Error(
              `Failed to fetch customer id: ${project.customer_id}`
            );
          }
          const customer = await customerRes.json();
          setCustomerInfo(customer);
          // Set loading to false after both requests complete
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Ensure loading is set to false on error
          setLoading(false);
        }
      };

      getProjectAndCustomer();
    }
  }, [params.slug]);

  // react-hook-form VARS
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: {
      customer_id: customerInfo?.customer_id,
      project_id: project?.project_id,
      address_one: project?.address_one,
      city: project?.city,
      state: project?.state,
      zip_code: project?.zip_code,
      scope_of_work: project?.scope_of_work,
      special_request: project?.special_request,
      quoted_price: project?.quoted_price,
    },
  });

  // Reset form values when project or customerInfo changes
  useEffect(() => {
    if (project && customerInfo) {
      reset({
        customer_id: customerInfo.customer_id,
        project_id: project.project_id,
        address_one: project.address_one,
        city: project.city,
        state: project.state,
        zip_code: project.zip_code,
        scope_of_work: project.scope_of_work,
        special_request: project.special_request,
        quoted_price: project.quoted_price,
      });
    }
  }, [project, customerInfo, reset]);

  // Handle Form Submit Button and Trigger Modal
  const onSubmit: SubmitHandler<Project> = (data) => {
    console.log(data);
    // Modal and REST API call
    editProject(data);
  };

  // This will reset the form values
  // Pre-populate form with fetched data
  const clearForm = () => {
    reset({
      customer_id: customerInfo?.customer_id,
      project_id: project?.project_id,
      address_one: project?.address_one,
      city: project?.city,
      state: project?.state,
      zip_code: project?.zip_code,
      scope_of_work: project?.scope_of_work,
      special_request: project?.special_request,
      quoted_price: project?.quoted_price,
    });
  };

  // TODO: Update Modal Code
  // Edit Project and trigger Modal Success/Error
  const editProject = (data: Project) => {
    // const modalBtn = document.getElementById("modalBtn");
    // Edit Project Successful
    try {
      // fetch method for PUT
      fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Set Modal to Success
      setModalStatus({
        title: "Success",
        status: "Project Edited",
        css: "bg-teal-500",
      });

      toggleModal();
      // modalBtn?.click();
      console.log("Project Edited:", data);
    } catch (error) {
      // API Errors
      setModalStatus({
        title: "Error",
        status: "Error Editing Project",
        css: "bg-red-500",
      });

      toggleModal();
      // modalBtn?.click();
      console.error("Error editing project:");
    }
  };

  // Handle Modal Click
  const handleButtonClick = () => {
    // Project Success redirect to All Customers
    if (modalStatus.title === "Success") {
      console.log("OK 200...");
      console.log("Redirecting...");
      router.push(`../display-project/${project?.project_id}`);
    } else {
      // Inform of error and prompt back to creation
      console.log("Closing modal...");
      const modalCloseBtn = document.querySelector(
        "#hs-vertically-centered-modal"
      ) as HTMLElement;
      if (modalCloseBtn) {
        modalCloseBtn.click();
      } else {
        console.log("No Modal Button found.");
      }
    }
  };

  // Display loading while pulling data
  if (loading) return <div>Loading...</div>;
  // Display Project not found if error with Project ID
  if (!project)
    return (
      <div>
        Project with ID: {params.slug} not found
        <div className="flex justify-center items-center pt-4">
          <Link href="../allprojects" className="text-center text-blue-500">
            Back to all projects
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <p>Edit Project</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="customer-name"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Customer
            </label>
            <select
              className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              id="customer-name"
              disabled
              defaultValue=""
              {...register("customer_id", {
                valueAsNumber: true,
                required: "Must Select A Customer for project.",
              })}
            >
              <option
                key={customerInfo?.customer_id}
                value={customerInfo?.customer_id}
              >
                {`${customerInfo?.first_name} ${customerInfo?.last_name}`}
              </option>
            </select>
            {/* <!-- Display validation error message for address --> */}
            <div>
              {errors.customer_id && (
                <span className="text-red-600 text-sm">
                  {errors.customer_id.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full px-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="1234 Main St"
              maxLength={50}
              {...register("address_one", {
                required: "Adress is required.",
                minLength: {
                  value: 10,
                  message: "Address too short, minimum length is 10 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Too long, max length 50 characters",
                },
              })}
            />
            {/* <!-- Display validation error message for address --> */}
            <div>
              {errors.address_one && (
                <span className="text-red-600 text-sm">
                  {errors.address_one.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Los Angeles"
              {...register("city", {
                required: "City is required.",
                minLength: {
                  value: 5,
                  message: "City too short, minimum length is 5 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Too long, max length 50 characters",
                },
              })}
            />
            {/* <!-- Display validation error message for city --> */}
            <div>
              {errors.city && (
                <span className="text-red-600 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              State
            </label>
            <select
              className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              id="inputState"
              defaultValue="CA"
              {...register("state", { required: true })}
            >
              <option>AZ</option>
              <option>CA</option>
            </select>
            {/* <!-- Display validation error message for state --> */}
            <div>
              {errors.state && (
                <span className="text-red-600 text-sm">State is required.</span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <label
              htmlFor="zip"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Zip
            </label>
            <input
              type="text"
              id="zip"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="91210"
              {...register("zip_code", {
                required: "Zip is required.",
                minLength: {
                  value: 5,
                  message: "Zip Code too short, minimum length is 5 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Too long, max length 10 characters",
                },
                pattern: {
                  value: /^[0-9]*-?[0-9]*$/,
                  message: "Invalid zip code format.",
                },
              })}
            />
            {/* <!-- Display validation error message for Zip --> */}
            <div>
              {errors.zip_code && (
                <span className="text-red-600 text-sm">
                  {errors.zip_code.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full px-2">
            <label
              htmlFor="scope-of-work"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Scope of Work
            </label>
            <textarea
              id="scope-of-work"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={3}
              placeholder="Work to be completed..."
              {...register("scope_of_work", { required: true })}
            ></textarea>
            {/* <!-- Display validation error message for scope_of_work --> */}
            <div>
              {errors.scope_of_work && (
                <span className="text-red-600 text-sm">
                  Scope of Work is required.
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="special-request"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Special Requests
            </label>
            <textarea
              id="special-request"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={3}
              placeholder="Any customer special request items."
              {...register("special_request")}
            ></textarea>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="quoted-price"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Quoted Price
            </label>
            <input
              type="text"
              id="quoted-price"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="999.99"
              {...register("quoted_price", {
                required: true,
                pattern: /^\d{1,10}(\.\d{2})?$/,
              })}
            />
            {/* <!-- Display validation error message for quoted_price --> */}
            <div>
              {errors.quoted_price && (
                <span className="text-red-600 text-sm">
                  Quoted Price is required.
                </span>
              )}
            </div>
          </div>
          <div className="w-full px-2 pt-4 flex justify-center space-x-4">
            <button
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
              onClick={clearForm}
            >
              Reset
            </button>
            {/* Modal Component with Props passed in */}
            <Modal
              modalStatus={modalStatus}
              handleOkClick={handleButtonClick}
              isOpen={isOpen}
              toggleModal={toggleModal}
              showCancelButton={false}
            />
          </div>
          <div className="w-full px-2 pt-4 flex justify-center space-x-4">
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Link href={`../display-project/${project?.project_id}`}>
                Back
              </Link>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
