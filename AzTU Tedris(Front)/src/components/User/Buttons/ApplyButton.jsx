import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplymentModal from "../Modal/ApplymentModal";

const Buttons = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null)

  const handleMyApplyClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 4000);
  };
  

  useEffect(() => {
    const handleClickOutside = (e) =>{
      if(modalRef.current && !modalRef.current.contains(e.target)){
        setShowModal(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  




  return (
    <div className="flex gap-5">
      <button
        onClick={() => navigate("/muraciet-et")}
        className="px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 lg:text-2xl md:text-xl sm:text-lg text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Müraciət Et
      </button>

      <button
        onClick={handleMyApplyClick}
        className="px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 lg:text-2xl font-medium text-gray-400 bg-gray-300 md:text-xl hover:bg-[#a2a6ab] hover:text-white sm:text-lg text-sm rounded-xl transition-all duration-200 ease-in"
      >
        Müraciətlərim
      </button>
      <ApplymentModal showModal={showModal} ref={modalRef}/>
      
    </div>
  );
};

export default Buttons;
