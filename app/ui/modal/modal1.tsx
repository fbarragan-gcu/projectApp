import { useState } from "react";

type ModalStatus = {
  title: string;
  status: string;
  css: string;
};

interface Props {
  modalStatus: ModalStatus;
  handleOkClick: () => void;
  showCancelButton: boolean;
  isOpen: boolean;
  toggleModal: () => void;
}

// New Modal, will expand for better modularity.
const Modal = ({
  modalStatus,
  handleOkClick,
  showCancelButton = true,
  isOpen,
  toggleModal,
}: Props) => {
  // State to mange Modal Open/Close
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleOk = () => {
    handleOkClick();
    // setIsOpen(false);
    toggleModal();
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
                id="okBtn"
                type="button"
                className={`px-4 py-2 rounded text-white ${modalStatus.css}`}
                onClick={handleOk}
              >
                OK
              </button>
              {/* Cancel Button  conditional */}
              {showCancelButton && (
                <button
                  id="cancelBtn"
                  type="button"
                  className={`px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 ml-2`}
                  // onClick={handleClose}
                  onClick={toggleModal}
                  aria-label="Close"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
