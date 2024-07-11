"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { User } from "../lib/definitions";
import { signup } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../ui/modal/modal1";

// Register a new Admin Page
// TODO: Include Modal for success or error, and re-route after success.
export default function Register() {
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
  // State for Successful or Error Login
  const [regStatus, setRegStatus] = useState<string | null>(null);
  // react-hook-form VARS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  // for redirect
  const router = useRouter();

  // Handle Form Submit Button and Trigger Modal
  const onSubmit: SubmitHandler<User> = async (data) => {
    // Create new FormData to hold validated content
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    // Verify that passwords match
    const passMatch = data.password === data.password_confirm;

    if (!passMatch) {
      setRegStatus("Passwords do not Match");
      return;
    }

    // Use Server Action to Post New User
    try {
      const response = await signup(formData);
      if (response.error) {
        setRegStatus(response.error);
        setModalStatus({
          title: "Error",
          status: "Error Registering User",
          css: "bg-red-500",
        });
      } else if (response.success) {
        setRegStatus(null);
        setModalStatus({
          title: "Success",
          status: "New User Registered",
          css: "bg-teal-500",
        });

        toggleModal();
      }
    } catch (error) {
      setRegStatus("An unexpected error has occurred");
      console.log("Error during registration: ", error);
      setModalStatus({
        title: "Unknow Error",
        status: "An Unknown Error has Occured",
        css: "bg-red-500",
      });
    }
  };

  // Handle Modal Click
  const handleButtonClick = () => {
    // Project Success redirect to All Customers
    if (modalStatus.title === "Success") {
      console.log("OK 200...");
      console.log("Redirecting...");
      router.push("/");
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
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?
              <Link
                href={"/login"}
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {/* <!-- Form --> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                {/* <!-- Form Group --> */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="first_name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      aria-describedby="firstName-error"
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
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="last_name"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        required
                        aria-describedby="lastName-error"
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
                    {/* <!-- End Form Group --> */}

                    {/* <!-- Form Group --> */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          required
                          aria-describedby="email-error"
                          maxLength={50}
                          {...register("email", {
                            validate: (value) => {
                              if (!value) return true; // Allow empty values
                              const isValidEmail =
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                              return (
                                isValidEmail || "Invalid email address format."
                              );
                            },
                          })}
                        />
                        {/* <!-- Display validation error message for email_address --> */}
                        <div>
                          {errors.email && (
                            <span className="text-red-600 text-sm">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* <!-- End Form Group --> */}

                      {/* <!-- Form Group --> */}
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            required
                            aria-describedby="password-error"
                            {...register("password", {
                              required: "Password is required.",
                              minLength: {
                                value: 6,
                                message:
                                  "Password is too short, minimum length is 6 characters",
                              },
                              maxLength: {
                                value: 50,
                                message: "Too long, max length 50 characters",
                              },
                            })}
                          />
                          {/* <!-- Display validation error message for last_name --> */}
                          <div>
                            {errors.password && (
                              <span className="text-red-600 text-sm">
                                {errors.password.message}
                              </span>
                            )}
                          </div>
                          {/* <!-- End Form Group --> */}

                          {/* <!-- Form Group --> */}
                          <div>
                            <label
                              htmlFor="password-confirm"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                id="password-confirm"
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                required
                                aria-describedby="password-confirm-error"
                                {...register("password_confirm", {
                                  required: "Password is required.",
                                  minLength: {
                                    value: 6,
                                    message:
                                      "Password is too short, minimum length is 6 characters",
                                  },
                                  maxLength: {
                                    value: 50,
                                    message:
                                      "Too long, max length 50 characters",
                                  },
                                })}
                              />
                              <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg
                                  className="size-5 text-red-500"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                              </div>
                            </div>
                            <p
                              className="hidden text-xs text-red-600 mt-2"
                              id="password-confirm-error"
                            >
                              Password does not match the password
                            </p>
                          </div>
                          {/* <!-- End Form Group --> */}
                          <div className="py-2 text-red-600 text-sm">
                            {regStatus
                              ? `Error with Registration: ${regStatus}`
                              : ""}
                          </div>
                          <button
                            type="submit"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            formAction={signup}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* <!-- End Form --> */}
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
      </div>
    </>
  );
}
