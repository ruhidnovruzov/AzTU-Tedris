import React, { forwardRef } from 'react';
import { CiWarning } from "react-icons/ci";

const ApplymentModal = forwardRef(({ showModal, onClose }, ref) => {
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={ref} className="bg-white p-5 md:p-7 rounded-xl">
            <CiWarning className="mx-auto size-8 md:size-12 text-red-500 mb-5" />
            <p className="font-medium text-sm md:text-base">
              Sizin hələ heç bir müraciətiniz yoxdur!
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default ApplymentModal;
