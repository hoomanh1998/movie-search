import { SVGAttributes } from "react";

const MenuIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      fill="none"
      className={props.className}
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
        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
      ></path>
    </svg>
  );
};

export default MenuIcon;
