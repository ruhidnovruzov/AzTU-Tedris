import React, { useEffect, useRef } from "react";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../../context/TokenContext";

const User = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useContext(AuthContext); 

  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div>
      {isOpen && (
        <div
          ref={cardRef}
          className="absolute top-14 right-3 p-4 rounded-2xl bg-white shadow-xl w-80 transition-transform duration-300 transform translate-y-0 ease-in-out"
        >
          <div className="flex gap-2 px-2.5 py-2 rounded-lg shadow mb-2">
            <div className="p-3 bg-[#f4f4f4] rounded-lg shadow-sm">
              <FaUser />
            </div>
            <div className="text-sm text-black">
              <h3 className="font-[600]">Ad, soyad:</h3>
              <p className="text-[#9e9e9e]">{user.name} {user.surname}</p>
            </div>
          </div>

          <div className="flex gap-4 px-2.5 py-2 rounded-lg shadow mb-2">
            <div className="p-3 bg-[#f4f4f4] rounded-lg shadow-sm">
              <MdEmail />
            </div>
            <div className="text-sm text-black">
              <h3 className="font-[600]">Email:</h3>
              <p className="text-[#9e9e9e]">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-4 px-2.5 py-2 rounded-lg shadow mb-2">
            <div className="p-3 bg-[#f4f4f4] rounded-lg shadow-sm">
              <PiPasswordFill />
            </div>
            <div className="text-sm text-black">
              <h3 className="font-[600]">Şifrə</h3>
              <p className="text-[#9e9e9e]">Şifrə dəyiş</p>
            </div>
          </div>

          <Link to="/admin/setting">
            <div className="flex gap-4 px-2.5 py-2 rounded-lg shadow mb-2">
              <div className="p-3 bg-[#f4f4f4] rounded-lg shadow-sm">
                <IoIosSettings className="size-5"/>
              </div>
              <div className="text-sm text-black">
                <h3 className="font-[600]">Settings:</h3>
                <p className="text-[#9e9e9e]">Ayarlar</p>
              </div>
            </div>
          </Link>

          <div className="w-full gap-1 flex mt-4 text-sm">
            <button
              className="text-gray-600 p-2 w-full flex items-center justify-center text-sm gap-2 font-[600] bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Close <IoClose className="size-5"/>
            </button>
            <button 
              className="p-2 bg-[#ff0000] flex justify-center items-center gap-2 text-sm font-[600] text-white w-full hover:bg-red-600 transition-colors duration-200 rounded-lg"
              onClick={logout} 
            >
              Log out <IoLogOut className="size-5"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
