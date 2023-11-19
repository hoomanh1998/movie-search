import { SVGAttributes } from "react";

const ArrowUpIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      className={props.className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
};

export default ArrowUpIcon;
