import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-3 md:p-6 rounded-lg shadow-lg">
        <h2 className="md:text-xl text-base font-semibold md:mb-4 mb-2">Əminsinizmi?</h2>
        <p>Bu admini silmək istədiyinizə əminsiniz?</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="md:px-4 md:py-2 px-2 py-2 text-sm md:text-base bg-gray-400 text-white rounded-lg mr-2 hover:bg-gray-500"
          >
            Ləğv et
          </button>
          <button
            onClick={onConfirm}
            className="md:px-4 md:py-2 px-2 py-2 text-sm md:text-base bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Təsdiq et
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
