import UserIcon from "@icons/user-icon";

const Cast = ({ name }: { name: string }) => {
  return (
    <li className="flex flex-col w-20 items-center mr-5">
      <div className="flex justify-center items-center rounded-full w-20 h-20 bg-gray-200 shadow-md mb-3">
        <UserIcon className="w-10 h-10 stroke-gray-900" />
      </div>
      <div className="text-center text-sm sm:text-base break-words">{name}</div>
    </li>
  );
};

export default Cast;