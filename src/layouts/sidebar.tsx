import React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./store/useSidebar";
import { useMovieDetails } from "@features/movies";

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebarHandler } = useSidebar((state) => ({
    isSidebarOpen: state.isOpen,
    closeSidebarHandler: state.closeSidebarHandler,
  }));
  const boomarkedMoviesLength = useMovieDetails(
    (state) => state.bookmarkedMovies.length
  );
  return (
    <React.Fragment>
      <nav
        className={`fixed top-0 right-0 flex flex-col w-3/4 max-w-xs h-full bg-gray-700 transition-transform duration-300 p-5 z-40 shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-2">
          <li
            className="text-white text-lg hover:bg-gray-800 rounded-lg transition-colors duration-100 ease-in-out cursor-pointer"
            onClick={closeSidebarHandler}
          >
            <NavLink
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-blue-500 rounded-lg" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li
            className="text-white text-lg hover:bg-gray-800 rounded-lg transition-colors duration-100 ease-in-out cursor-pointer"
            onClick={closeSidebarHandler}
          >
            <NavLink
              className={({ isActive }) =>
                `flex flex-row justify-between items-center px-4 py-2 ${
                  isActive ? "bg-blue-500 rounded-lg" : ""
                }`
              }
              to="/bookmarked-movies"
            >
              Bookmarked Movies
              {boomarkedMoviesLength > 0 && (
                <div className="flex justify-center items-center w-6 h-6 bg-blue-500 text-sm font-bold rounded-full text-white">
                  {boomarkedMoviesLength}
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={`fixed top-0 left-0 w-full h-full transition-colors duration-300 ${
          isSidebarOpen
            ? "bg-black bg-opacity-70 z-30"
            : "bg-black bg-opacity-0 z-0"
        }`}
        onClick={closeSidebarHandler}
      />
    </React.Fragment>
  );
};
