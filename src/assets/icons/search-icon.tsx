import { SVGAttributes } from "react";

type SearchIconType = {
  active: boolean;
} & SVGAttributes<SVGElement>;

const SearchIcon = ({ active, ...props }: SearchIconType) => {
  return (
    <svg
      fill="none"
      className={`w-6 h-6 cursor-pointer transition-colors duration-75 hover:stroke-white ${
        active ? "stroke-white" : "stroke-gray-400"
      }`}
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      ></path>
    </svg>
  );
};

export default SearchIcon;
