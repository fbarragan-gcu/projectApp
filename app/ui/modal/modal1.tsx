import { useState } from "react";

type ModalStatus = {
  title: string;
  status: string;
  css: string;
};

interface Props {
  modalStatus: ModalStatus;
  handleButtonClick: () => void;
}

// New Modal, will expand for better modularity.
const Modal = ({ modalStatus, handleButtonClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* X Button trigger modal */}
      <button
        type="button"
        id="modalBtn"
        className="hidden"
        onClick={toggleModal}
      >
        Launch modal
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-4 bg-white w-full max-w-md m-auto rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">{modalStatus.title}</h1>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleModal}
                aria-label="Close"
              >
                &#10005;
              </button>
            </div>
            <div className="mb-4">{modalStatus.status}</div>
            <div className="flex justify-end">
              <button
                id="closeBtn"
                type="button"
                className={`px-4 py-2 rounded text-white ${modalStatus.css}`}
                onClick={handleButtonClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
