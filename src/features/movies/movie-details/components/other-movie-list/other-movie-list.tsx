import OtherMovieCard from "./other-movie-card";
import { useState, MouseEvent, useRef } from "react";
import { useMovieDetails } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { OtherMovieListLoader } from "../skeleton-loaders";
import { Movie } from "@utils/types";

const OtherMovieList = ({ movieID }: { movieID: string }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setisDragging] = useState(false);
  const otherMovieSliderRef = useRef<HTMLUListElement>(null);
  const mouseCoordinates = useRef({
    startX: 0,
    scrollLeft: 0,
  });
  const getOtherMovies = useMovieDetails((state) => state.getOtherMovies);

  const { isError, error, isLoading, data } = useQuery<Movie[], Error>({
    queryKey: ["otherMovies", movieID],
    queryFn: () => getOtherMovies(movieID),
  });

  const dragStartHandler = (e: MouseEvent<HTMLUListElement>) => {
    setIsMouseDown(true);
    if (!otherMovieSliderRef.current) return;
    const sliderWrapper = otherMovieSliderRef.current;
    const startX = e.pageX - sliderWrapper.offsetLeft;
    const scrollLeft = sliderWrapper.scrollLeft;
    otherMovieSliderRef.current.style.cursor = "grabbing";
    mouseCoordinates.current = { startX, scrollLeft };
  };

  const dragEndHandler = () => {
    setIsMouseDown(false);
    setTimeout(() => setisDragging(false), 200);
    if (!otherMovieSliderRef.current) return;
    otherMovieSliderRef.current.style.cursor = "default";
  };

  const dragHandler = (e: MouseEvent<HTMLUListElement>) => {
    if (!isMouseDown || !otherMovieSliderRef.current) return;
    setisDragging(true);
    e.preventDefault();
    const slider = otherMovieSliderRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walkX = (x - mouseCoordinates.current.startX) * 1.5;
    otherMovieSliderRef.current.scrollLeft =
      mouseCoordinates.current.scrollLeft - walkX;
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold mb-5">Other Movies</h3>
      {isLoading ? (
        <OtherMovieListLoader />
      ) : isError ? (
        <p className="text-white">{error.message}</p>
      ) : (
        <ul
          onMouseDown={dragStartHandler}
          onMouseMove={dragHandler}
          onMouseUp={dragEndHandler}
          ref={otherMovieSliderRef}
          className="flex flex-row overflow-x-scroll -mx-5 pl-5 scrollbar-hide"
        >
          {data?.map(({ id, title, poster }) => (
            <OtherMovieCard
              key={id}
              id={id!}
              title={title}
              image={poster}
              isDragging={isDragging}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OtherMovieList;
