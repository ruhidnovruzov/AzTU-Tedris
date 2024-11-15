import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LiaUniversitySolid } from "react-icons/lia";
import { IoMenu } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFileEarmarkFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../context/TokenContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const location = useLocation();
  const accordionRef = useRef(null);

  const { user} = useContext(AuthContext);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <aside>
      <div className="lg:hidden p-4  text-[#6b6f83] absolute left-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#474747]  absolute md:ml-2 mt-1 z-20"
        >
          <IoMenu className="size-7" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative h-screen left-0 z-20 w-[240px] bg-[#ffffff] text-[#474747] font-medium transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 pl-6  h-[68px] w-full border-b border-[#efefef] flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2">
              <LiaUniversitySolid className="size-8" />
              <h1 className="font-bold text-lg text-nowrap">AzTU Tədris</h1>
            </div>
          </Link>

          <button onClick={closeSidebar}>
            <FaArrowLeftLong className="lg:hidden size-4" />
          </button>
        </div>
        <ul className="p-4 flex flex-col gap-1">
          <li
            className={`${
              location.pathname === "/admin"
                ? "bg-[#4338CA] text-white"
                : "hover:bg-[#dbdbdb] hover:text-black"
            } transition-all p-3 rounded-2xl duration-300 cursor-pointer`}
            onClick={closeSidebar}
          >
            <Link to="/admin" className="w-full flex items-center gap-2">
              <BsFillGridFill />
              Dashboard
            </Link>
          </li>

         {
          user.role === "superadmin" &&
          <li
          className={`${
            location.pathname === "/admin/users"
              ? "bg-[#4338CA] text-white"
              : "hover:bg-[#dbdbdb] hover:text-black"
          } transition-all p-3 rounded-2xl duration-300 cursor-pointer`}
          onClick={closeSidebar}
        >
          <Link to="/admin/users" className="w-full flex items-center gap-2">
            <FaUsers />
            Users
          </Link>
        </li>
         }

          <li
            className={`${
              location.pathname === "/admin/setting"
                ? "bg-[#4338CA] text-white"
                : "hover:bg-[#dbdbdb] hover:text-black"
            } transition-all p-3 rounded-2xl duration-300 cursor-pointer`}
            onClick={closeSidebar}
          >
            <Link to="/admin/setting" className="w-full flex items-center gap-2">
              <BsFillGearFill />
              Settings
            </Link>
          </li>

          <li
            className={`${
              location.pathname === "/admin/documents"
                ? "bg-[#4338CA] text-white"
                : "hover:bg-[#dbdbdb] hover:text-black"
            } transition-all p-3 rounded-2xl duration-300 cursor-pointer`}
            onClick={closeSidebar}
          >
            <Link to="/admin/documents" className="w-full flex items-center gap-2">
              <BsFileEarmarkFill />
              Sənədlər
            </Link>
          </li>
          <li
            ref={accordionRef}
            className="hover:bg-[#dbdbdb]  hover:text-black transition-all p-3 rounded-2xl duration-300 cursor-pointer flex justify-between items-center"
            onClick={toggleAccordion}
          >
            <span className="flex items-center gap-2">
              <BsFillBookmarkFill />
              Orders
            </span>
            {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
          </li>
          <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
              isAccordionOpen ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col gap-2">
              <li
                className={`${
                  location.pathname === "/admin/about"
                    ? "bg-[#4338CA] text-white"
                    : "hover:bg-[#dbdbdb] hover:text-black"
                } transition-all p-3 pl-10 rounded-2xl duration-300 cursor-pointer`}
                onClick={closeSidebar}
              >
                <Link to="/admin/about" className="block w-full">
                  Item 1
                </Link>
              </li>
              <li className="hover:bg-[#dbdbdb]  hover:text-black pl-10 p-3 rounded-2xl transition duration-300 cursor-pointer">
                <Link to="/admin/reference" className="block w-full">
                  Item 2
                </Link>
              </li>
              <li className="hover:bg-[#dbdbdb]  hover:text-black pl-10 p-3 rounded-2xl transition duration-300 cursor-pointer">
                Item 3
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
