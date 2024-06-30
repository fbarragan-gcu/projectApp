"use client";

import { useState } from "react";

// Types to be passed as Object of Props
type ModalStatus = {
  title: string;
  status: string;
  css: string;
};

interface Props {
  modalStatus: ModalStatus;
  handleButtonClick: () => void;
}

export default function Modal({ modalStatus, handleButtonClick }: Props) {
  const [modalSettings, setModalSettings] = useState<ModalStatus>(modalStatus);

  const handleModal = () => {
    setModalSettings({
      title: modalSettings.title,
      status: modalSettings.status,
      css: modalSettings.css,
    });
  };
  return (
    <>
      <button
        type="button"
        id="modalBtn"
        hidden
        className="py-3 px-4 items-center hidden gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        data-hs-overlay="#hs-vertically-centered-modal"
        onClick={handleModal}
      >
        Launch Modal
      </button>

      <div
        id="hs-vertically-centered-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                {modalStatus.title}
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                data-hs-overlay="#hs-vertically-centered-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-gray-800 dark:text-neutral-400">
                {modalStatus.status}
              </p>
            </div>
            {/* Modal Button is Centered, CSS is inserted via props */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 ${modalStatus.css} text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800`}
                data-hs-overlay="#hs-vertically-centered-modal"
                onClick={handleButtonClick}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
