import React from "react";
import { Sidebar } from "./sidebar";
import { useSidebar } from "./store/useSidebar";
import MenuIcon from "@icons/menu-icon";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  const { isSidebarOpen, openSidebarHandler } = useSidebar((state) => ({
    isSidebarOpen: state.isOpen,
    openSidebarHandler: state.openSidebarHandler,
  }));

  return (
    <React.Fragment>
      <Sidebar />
      <main className="relative w-full h-full flex flex-col justify-center items-center bg-gray-800">
        <MenuIcon
          className={`fixed w-10 h-10 stroke-white top-7 right-7 bg-gray-800 bg-opacity-50 rounded-xl transition-opacity duration-150 sm:cursor-pointer ${
            isSidebarOpen ? "opacity-0 -z-10" : "opacity-100 z-40"
          }`}
          onClick={openSidebarHandler}
        />

        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
