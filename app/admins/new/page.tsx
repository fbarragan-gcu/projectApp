export default function New() {
  return (
    <>
      <p>Register a New Admin</p>
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
          />
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
          />
        </div>
        <div className="w-full px-2">
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
          />
        </div>

        <div className="w-full px-2" data-hs-toggle-password-group="">
          <div className="w-full">
            <label
              htmlFor="hs-toggle-password-multi-toggle-np"
              className="block text-sm mb-2 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="hs-toggle-password-multi-toggle-np"
                type="password"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter new password"
                value="12345qwerty"
              />
              <button
                type="button"
                data-hs-toggle-password='{
          "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
        }'
                className="absolute top-0 end-0 p-3.5 rounded-e-md"
              >
                <svg
                  className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="hs-password-active:hidden"
                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                  ></path>
                  <path
                    className="hs-password-active:hidden"
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  ></path>
                  <path
                    className="hs-password-active:hidden"
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  ></path>
                  <line
                    className="hs-password-active:hidden"
                    x1="2"
                    x2="22"
                    y1="2"
                    y2="22"
                  ></line>
                  <path
                    className="hidden hs-password-active:block"
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                  ></path>
                  <circle
                    className="hidden hs-password-active:block"
                    cx="12"
                    cy="12"
                    r="3"
                  ></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="hs-toggle-password-multi-toggle"
              className="block text-sm mb-2 dark:text-white"
            >
              Verify password
            </label>
            <div className="relative">
              <input
                id="hs-toggle-password-multi-toggle"
                type="password"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Enter current password"
                value="12345qwerty"
              />
              <button
                type="button"
                data-hs-toggle-password='{
          "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
        }'
                className="absolute top-0 end-0 p-3.5 rounded-e-md"
              >
                <svg
                  className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="hs-password-active:hidden"
                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                  ></path>
                  <path
                    className="hs-password-active:hidden"
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  ></path>
                  <path
                    className="hs-password-active:hidden"
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  ></path>
                  <line
                    className="hs-password-active:hidden"
                    x1="2"
                    x2="22"
                    y1="2"
                    y2="22"
                  ></line>
                  <path
                    className="hidden hs-password-active:block"
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                  ></path>
                  <circle
                    className="hidden hs-password-active:block"
                    cx="12"
                    cy="12"
                    r="3"
                  ></circle>
                </svg>
              </button>
            </div>
          </div>
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
