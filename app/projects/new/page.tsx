"use client";
import { Project, Customer } from "@/app/lib/definitions";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "@/app/ui/modal/modal1";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/supabase/queries";
import Link from "next/link";

const supabase = createClient();

// Create New Project Page
export default function New() {
  // React State VARS
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [admin, setAdmin] = useState<string | null>(null);
  // Set Loading State
  const [loading, setLoading] = useState(true);
  // Set Project Length
  const [numbCustomers, setNumbCustomers] = useState(null);
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

  // Get Admin Id
  useEffect(() => {
    getUser(supabase)
      .then((user) => setAdmin(user?.id || null))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!admin) {
      return;
    }

    // using NEXT_PUBLIC_API_URL since client side
    async function fetchCustomers() {
      try {
        // Fetch only Customers belonging to Admin
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/customers/by-admin/${admin}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setAllCustomers(data);
        setNumbCustomers(data.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    }

    if (admin) {
      fetchCustomers();
    }
  }, [admin]);

  // react-hook-form VARS
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>();

  // Handle Form Submit Button and Trigger Modal
  const onSubmit: SubmitHandler<Project> = (data) => {
    // Modal and REST API call
    createProject(data);
  };

  // This will reset the form values
  const clearForm = () => {
    reset();
  };

  // Create customer and trigger Modal Success/Error
  const createProject = (data: Project) => {
    const modalBtn = document.getElementById("modalBtn");
    // Success Creating customer
    try {
      setModalStatus({
        title: "Success",
        status: `Project Created `,
        css: "bg-teal-500",
      });

      // fetch method for POST
      fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      modalBtn?.click();
    } catch (error) {
      // API Errors
      setModalStatus({
        title: "Error",
        status: "Error Creating Project",
        css: "bg-red-500",
      });

      modalBtn?.click();
      console.error("Error creating project:");
    }
  };

  // Handle Modal Click
  const handleButtonClick = () => {
    // Project Success redirect to All Customers
    if (modalStatus.title === "Success") {
      console.log("OK 200...");
      console.log("Redirecting...");
      router.push("/projects/all-projects");
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
  if (numbCustomers === 0)
    return (
      <div>
        No Customers Yet, To create a new Project you must create a Customer
        record first.
        <div className="flex justify-center items-center pt-4">
          <Link href="../customers/new" className="text-center text-blue-500">
            Create a New Customer
          </Link>
        </div>
        <div className="flex justify-center items-center pt-4">
          <Link
            href="../customers/all-customers"
            className="text-center text-blue-500"
          >
            Back to all customers
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <p>Create a Project</p>
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
              defaultValue=""
              {...register("customer_id", {
                valueAsNumber: true,
                required: "Must Select A Customer for project.",
              })}
            >
              <option value="" disabled hidden>
                Select Customer
              </option>
              {allCustomers.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {`${customer.first_name} ${customer.last_name}`}
                </option>
              ))}
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
              Create
            </button>
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
              onClick={clearForm}
            >
              Clear
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
        </div>
      </form>
    </>
  );
}
