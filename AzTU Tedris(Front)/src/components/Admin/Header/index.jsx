import React, { useState } from "react";
import User from "./User";
import { FaChevronDown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative top-0 h-[68px] border-b bg-white">
      <div className="absolute right-10 top-[50%] translate-y-[-50%]">
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center relative"
        >
          <FaUserCircle className="size-8" />
          <FaChevronDown
            className={`ml-4 transition-transform text-[14px] duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute -top-5 -right-3  bg-white shadow-md">
            <User isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
