import React from "react";
import { Link } from "react-router-dom";
import { ProgressiveImage } from "ui";
import TrashIcon from "@icons/trash-icon";

interface IMovieCard {
  id: string;
  poster: string;
  title: string;
  reference?: (node: any) => void;
  bookmarked?: boolean;
  onRemove?: (id: string) => void;
}

export const MovieCard = React.memo(
  ({ id, poster, title, reference, bookmarked, onRemove }: IMovieCard) => (
    <li
      id={id}
      ref={reference}
      className="relative w-full h-full ring-blue-500 sm:hover:ring-4 transition duration-500 ease-in-out rounded-xl group"
    >
      <Link
        className="relative flex flex-col h-full md:rounded-xl overflow-hidden"
        to={`/movies/${id}`}
      >
        <ProgressiveImage
          src={poster}
          type="card"
          className="aspect-[2/3] object-cover rounded-xl w-full shadow-md sm:group-hover:scale-125 transition-transform duration-300 ease-in-out"
        />
        <div className="flex absolute left-0 bottom-0 w-full h-4/5 bg-gradient-to-t from-black to-transparent text-left translate-y-full opacity-100 sm:translate-y-4/5 sm:group-hover:translate-y-0 transition-transform duration-300 ease-in-out p-5">
          <div className="sm:text-2xl sm:font-bold break-words line-clamp-2 mt-auto mb-0">
            {title}
          </div>
        </div>
      </Link>
      {bookmarked && (
        <div
          className="absolute -top-2 -right-2 bg-white p-1.5 shadow-md rounded-full z-10 sm:cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            onRemove?.(id);
          }}
        >
          <TrashIcon className="w-5 h-5 stroke-red-500" />
        </div>
      )}
    </li>
  )
);
