import { SVGAttributes } from "react";

const CircleXIcon = ({
  show,
  ...props
}: {
  show?: boolean;
} & SVGAttributes<SVGElement>) => {
  return (
    <svg
      fill="none"
      className={`w-5 h-5 stroke-gray-400 transition-opacity sm:cursor-pointer ${
        show ? "opacity-100 z-0" : "opacity-0 -z-10"
      }`}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default CircleXIcon;
