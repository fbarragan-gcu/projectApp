export default function New() {
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
          >
            <option value="" disabled hidden>
              Select Customer
            </option>
            <option value="Customer Name HERE">Customer Name HERE</option>
          </select>
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
