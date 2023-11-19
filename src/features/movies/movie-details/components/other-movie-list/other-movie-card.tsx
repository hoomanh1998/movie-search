import { ProgressiveImage } from "ui";
import { Link } from "react-router-dom";

interface IOtherMovieCard {
  id: string;
  title: string;
  image: string;
  isDragging: boolean;
}

const OtherMovieCard = ({ id, title, image, isDragging }: IOtherMovieCard) => {
  return (
    <li className="flex w-36 sm:w-48 flex-col items-center mr-5">
      <Link
        className="relative flex flex-col h-full rounded-xl overflow-hidden"
        to={`/movies/${id}`}
        onClick={(e) => isDragging && e.preventDefault()}
      >
        <div className="aspect-[2/3] w-full h-56 sm:h-72 shadow-md mb-3">
          <ProgressiveImage
            src={image}
            type="card"
            className="object-cover w-full h-full rounded-xl mb-3 select-none"
            draggable={false}
          />
        </div>
        <div className="w-full text-left text-sm sm:text-base break-words line-clamp-2">
          {title}
        </div>
      </Link>
    </li>
  );
};

export default OtherMovieCard;
