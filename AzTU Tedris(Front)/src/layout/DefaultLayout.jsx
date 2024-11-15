import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col bg-[#ededed] overflow-auto">
        <Header />
        <main className="max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-3xl p-2 md:p-4 2xl:p-10 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
