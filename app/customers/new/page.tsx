"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "@/app/lib/definitions";
import { User } from "@supabase/supabase-js";
import Modal from "@/app/ui/modal/modal1";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Create New Customer Page
export default function New() {
  // Get Admin
  const [admin, setAdmin] = useState<User | null>(null);
  // Query for Admin ID
  useEffect(() => {
    getUser(supabase).then(setAdmin).catch(console.error);
  }, []);

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
  // react-hook-form VARS
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    defaultValues: {
      admin_id: admin?.id,
    },
  });

  // TODO: Fix Sloppy Code, not using spread
  // Handle Form Submit Button and Trigger Modal
  const onSubmit: SubmitHandler<Customer> = (data) => {
    // Append admin_id to form data
    const data1 = {
      ...data,
      admin_id: admin?.id ?? "", // Append admin_id from admin state
    };
    // Modal and REST API call
    createCustomers(data1);
  };

  // This will reset the form values
  const clearForm = () => {
    reset();
  };

  // Create customer and trigger Modal Success/Error
  const createCustomers = (data: Customer) => {
    const modalBtn = document.getElementById("modalBtn");
    // Success Creating customer
    try {
      setModalStatus({
        title: "Success",
        status: `Customer ${data.first_name} ${data.last_name} Created `,
        css: "bg-teal-500",
      });

      // fetch method for POST
      fetch("/api/customers", {
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
        status: "Error Creating Customer",
        css: "bg-red-500",
      });

      modalBtn?.click();
      console.error("Error creating customer:");
    }
  };

  // Handle Modal Click
  const handleButtonClick = () => {
    // Customer Success redirect to All Customers
    if (modalStatus.title === "Success") {
      console.log("OK 200...");
      console.log("Redirecting...");
      router.push("/customers/all-customers");
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
      <p>Create a New Customer</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          className="form-control"
          id="admin_id"
          readOnly
          value={admin?.id}
          {...register("admin_id")}
        />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="John"
              {...register("first_name", {
                required: "First name is required.",
                minLength: {
                  value: 3,
                  message:
                    "First Name too short, minimum length is 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Too long, max length 50 characters",
                },
              })}
            />
            {/* <!-- Display validation error message for first_name --> */}
            <div>
              {errors.first_name && (
                <span className="text-red-600 text-sm">
                  {errors.first_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Smith"
              {...register("last_name", {
                required: "Last name is required.",
                minLength: {
                  value: 3,
                  message:
                    "Last Name too short, minimum length is 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Too long, max length 50 characters",
                },
              })}
            />
            {/* <!-- Display validation error message for last_name --> */}
            <div>
              {errors.last_name && (
                <span className="text-red-600 text-sm">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full px-2">
            <label
              htmlFor="address1"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address1"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="1234 Main St."
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
          <div className="w-full px-2">
            <label
              htmlFor="address2"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Address 2
            </label>
            <input
              type="text"
              id="address2"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Apartment, Studio, or Floor"
              {...register("address_two")}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="John.Smith@Email.com"
              maxLength={50}
              {...register("email_address", {
                validate: (value) => {
                  if (!value) return true; // Allow empty values
                  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  return isValidEmail || "Invalid email address format.";
                },
              })}
            />
            {/* <!-- Display validation error message for email_address --> */}
            <div>
              {errors.email_address && (
                <span className="text-red-600 text-sm">
                  {errors.email_address.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone-number"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="123-456-7890"
              {...register("phone_number", {
                required: "Phone Number is required.",
                minLength: {
                  value: 6,
                  message: "Phone number must be 6 digits min",
                },
                maxLength: {
                  value: 12,
                  message: "Phone number can not be longer that 12 digits",
                },
              })}
            />
            {/* <!-- Display validation error message for phone_number --> */}
            <div>
              {errors.phone_number && (
                <span className="text-red-600 text-sm">
                  {errors.phone_number.message}
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
              {...register("state", { required: "State is required." })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Choose...
              </option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
            </select>
            {/* <!-- Display validation error message for state --> */}
            <div>
              {errors.state && (
                <span className="text-red-600 text-sm">
                  {errors.state.message}
                </span>
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
            {/* <!-- Display validation error message for city --> */}
            <div>
              {errors.zip_code && (
                <span className="text-red-600 text-sm">
                  {errors.zip_code.message}
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
