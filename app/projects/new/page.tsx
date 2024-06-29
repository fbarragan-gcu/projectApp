"use client";
import { Project, Customer } from "@/app/lib/definitions";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "@/app/ui/modal/modal";
import { HSOverlay } from "preline/preline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Create New Project Page
export default function New() {
  // React State VARS
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  // for redirect
  const router = useRouter();

  useEffect(() => {
    // using NEXT_PUBLIC_API_URL since client side
    async function fetchCustomers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setAllCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    fetchCustomers();
  }, []);

  // React State VARS for Modal
  const [modalStatus, setModalStatus] = useState({
    title: "",
    status: "",
    css: "",
  });
  // react-hook-form VARS
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>();

  // Handle Form Submit Button and Trigger Modal
  const onSubmit: SubmitHandler<Project> = (data) => {
    console.log(data);
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
      console.log("Project Created:", data);
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
      router.push("/projects/allprojects");
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

  return (
    <>
      <p>Create a Project</p>
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
              <span className="text-danger">{errors.customer_id.message}</span>
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
            placeholder="1234 Main St."
          />
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
          />
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
            defaultValue=""
          >
            <option value="" disabled hidden>
              Choose...
            </option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
          </select>
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
          />
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
          ></textarea>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label
            htmlFor="special-request"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Scope of Work
          </label>
          <textarea
            id="special-request"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            rows={3}
            placeholder="Any customer special request items."
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
          />
        </div>
        <div className="w-full px-2 pt-4 flex justify-center space-x-4">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Create
          </button>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
